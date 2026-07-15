// ============================================================
// LOCATION SEARCH SERVICE
// Provider: OpenStreetMap Nominatim (free, no API key required)
// Abstracted behind interface — swap provider without changing UI
// ============================================================

import { localLocations } from "@/data/localLocations";

export interface LocationSuggestion {
  id: string;
  displayName: string;        // Full formatted address
  shortName: string;          // Primary place name (city/area/locality)
  secondaryName: string;      // State, country etc
  type: string;               // village | city | suburb | state | country etc
  lat: string;
  lon: string;
}

// ---- Provider Interface ----
interface LocationProvider {
  search(query: string, signal?: AbortSignal): Promise<LocationSuggestion[]>;
}

// ---- Nominatim (OpenStreetMap) Implementation ----
class NominatimProvider implements LocationProvider {
  private readonly BASE_URL = "https://nominatim.openstreetmap.org/search";
  private readonly COUNTRY_CODES = "in"; // Restrict to India for relevant results

  async search(query: string, signal?: AbortSignal): Promise<LocationSuggestion[]> {
    if (!query || query.trim().length < 2) return [];

    const params = new URLSearchParams({
      q: query.trim(),
      format: "json",
      addressdetails: "1",
      limit: "8",
      countrycodes: this.COUNTRY_CODES,
      "accept-language": "en",
    });

    const url = `${this.BASE_URL}?${params.toString()}`;

    const response = await fetch(url, {
      signal,
      headers: {
        // Nominatim requires a User-Agent
        "User-Agent": "RudraDharunPackersMovers/1.0 (rudradhir1@gmail.com)",
        "Accept-Language": "en",
      },
    });

    if (!response.ok) {
      throw new Error(`Location search failed: ${response.status}`);
    }

    const data = await response.json();

    return (data as NominatimResult[]).map((item) => {
      const addr = item.address || {};

      // Most specific part — neighbourhood > suburb > village > town > city
      const specificPart =
        addr.neighbourhood ||
        addr.suburb ||
        addr.village ||
        addr.town ||
        addr.city ||
        addr.county ||
        addr.state ||
        item.display_name.split(",")[0].trim();

      // City-level context for secondary line
      const cityPart = addr.city || addr.town || addr.village || addr.county;
      const statePart = addr.state;

      // shortName = "Anna Nagar West, Chennai" — specific + city
      const shortNameParts = [specificPart];
      if (cityPart && cityPart !== specificPart) shortNameParts.push(cityPart);
      const shortName = shortNameParts.join(", ");

      // secondaryName = "Tamil Nadu" for the dropdown subtitle
      const secondaryName = statePart || "";

      // displayName = full clean address (comma-separated, trimmed)
      const displayName = item.display_name
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
        .join(", ");

      return {
        id: item.place_id.toString(),
        displayName,
        shortName,
        secondaryName,
        type: item.type || item.class || "location",
        lat: item.lat,
        lon: item.lon,
      };
    });
  }
}

// Nominatim API response shape
interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  class: string;
  address?: {
    neighbourhood?: string;
    suburb?: string;
    village?: string;
    town?: string;
    city?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
  };
}

// ---- Simple LRU-style cache ----
const MAX_CACHE_SIZE = 50;
const searchCache = new Map<string, LocationSuggestion[]>();

function getCached(key: string): LocationSuggestion[] | null {
  return searchCache.get(key) ?? null;
}

function setCache(key: string, results: LocationSuggestion[]) {
  if (searchCache.size >= MAX_CACHE_SIZE) {
    // Delete oldest entry
    const firstKey = searchCache.keys().next().value;
    if (firstKey) searchCache.delete(firstKey);
  }
  searchCache.set(key, results);
}

// ---- Singleton provider instance ----
const provider: LocationProvider = new NominatimProvider();

// ---- Public API ----
export async function searchLocations(
  query: string,
  signal?: AbortSignal
): Promise<LocationSuggestion[]> {
  if (!query || query.trim().length < 2) return [];
  const cacheKey = query.trim().toLowerCase();

  const cached = getCached(cacheKey);
  if (cached) return cached;

  // Step 1: Local Search
  const localResults = localLocations.filter((loc) => 
    loc.shortName.toLowerCase().includes(cacheKey) || 
    loc.displayName.toLowerCase().includes(cacheKey)
  );

  // If we have enough local results, return them instantly
  if (localResults.length >= 3) {
    setCache(cacheKey, localResults);
    return localResults;
  }

  // Step 2: Fallback to Nominatim
  try {
    const results = await provider.search(query, signal);
    
    // Combine local results and API results, removing duplicates by shortName
    const combined = [...localResults, ...results];
    const unique = Array.from(new Map(combined.map(item => [item.shortName, item])).values());
    
    setCache(cacheKey, unique);
    return unique;
  } catch (error) {
    if (localResults.length > 0) {
      setCache(cacheKey, localResults);
      return localResults;
    }
    throw error;
  }
}
