"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useState, useEffect, useRef, useCallback } from "react";
import { searchLocations, type LocationSuggestion } from "@/services/locationSearch";

const DEBOUNCE_MS = 300;
const MIN_QUERY_LENGTH = 2;

interface UseLocationSearchReturn {
  query: string;
  setQuery: (value: string) => void;
  suggestions: LocationSuggestion[];
  isLoading: boolean;
  error: string | null;
  clearSuggestions: () => void;
}

export function useLocationSearch(): UseLocationSearchReturn {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setError(null);
  }, []);

  useEffect(() => {
    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Abort previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (!query || query.trim().length < MIN_QUERY_LENGTH) {
      setSuggestions([]);
      setIsLoading(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    debounceTimerRef.current = setTimeout(async () => {
      const abortController = new AbortController();
      abortControllerRef.current = abortController;

      try {
        const results = await searchLocations(query, abortController.signal);
        if (!abortController.signal.aborted) {
          setSuggestions(results);
          setIsLoading(false);
        }
      } catch {
        if (!abortController.signal.aborted) {
          setError("Unable to fetch location suggestions. Please type manually.");
          setSuggestions([]);
          setIsLoading(false);
        }
      }
    }, DEBOUNCE_MS);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [query]);

  return { query, setQuery, suggestions, isLoading, error, clearSuggestions };
}
