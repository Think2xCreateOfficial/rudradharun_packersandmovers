"use client";
/* eslint-disable react-hooks/set-state-in-effect */

// =============================================================
// LocationAutocomplete
// Intelligent location search with graceful manual entry fallback.
// • Suggests streets, areas, cities, districts, states via Nominatim.
// • When no suggestion is found, the user's typed text is preserved
//   and accepted — they are never blocked from submitting.
// • Selecting a suggestion fills the input with the full formatted address.
// • Full keyboard navigation: ArrowUp/Down, Enter, Escape, Tab.
// =============================================================

import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useId,
} from "react";
import { MapPin, Loader2, X, ChevronDown } from "lucide-react";
import { useLocationSearch } from "@/hooks/useLocationSearch";
import { type LocationSuggestion } from "@/services/locationSearch";
import { cn } from "@/lib/utils";

// ---- Helper: Highlight matched text ----
function HighlightedText({
  text,
  query,
}: {
  text: string;
  query: string;
}) {
  if (!query.trim()) return <span>{text}</span>;

  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-brand-blue/15 text-brand-blue font-semibold rounded-sm not-italic">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}

// ---- Props Interface ----
export interface LocationAutocompleteProps {
  /** Controlled value */
  value: string;
  /** Called when user selects a suggestion or types manually */
  onChange: (value: string) => void;
  placeholder?: string;
  id?: string;
  name?: string;
  hasError?: boolean;
  className?: string;
  disabled?: boolean;
  "aria-describedby"?: string;
}

export function LocationAutocomplete({
  value,
  onChange,
  placeholder = "Search location...",
  id,
  name,
  hasError = false,
  className,
  disabled = false,
  "aria-describedby": ariaDescribedby,
}: LocationAutocompleteProps) {
  const generatedId = useId();
  const inputId = id || generatedId;
  const listboxId = `${inputId}-listbox`;

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [inputValue, setInputValue] = useState(value);

  const { setQuery, suggestions: apiSuggestions, isLoading, error, clearSuggestions } =
    useLocationSearch();

  // Inject manual entry suggestion if no API matches
  const suggestions = React.useMemo(() => {
    if (!isLoading && !error && apiSuggestions.length === 0 && inputValue.length >= 2) {
      return [{
        id: "manual-entry",
        displayName: inputValue,
        shortName: inputValue,
        secondaryName: "Use typed address",
        type: "manual",
        lat: "",
        lon: ""
      } as LocationSuggestion];
    }
    return apiSuggestions;
  }, [isLoading, error, apiSuggestions, inputValue]);

  // Sync controlled value → local display value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Open dropdown when we have results or the user has typed enough
  useEffect(() => {
    if (isLoading || suggestions.length > 0 || error) {
      setIsOpen(true);
      setActiveIndex(-1);
    } else if (!isLoading && suggestions.length === 0 && inputValue.length >= 2) {
      setIsOpen(true); // Show "no results — your text will be used" state
    } else {
      setIsOpen(false);
    }
  }, [suggestions, isLoading, error, inputValue.length]);

  // Close on outside click/touch
  useEffect(() => {
    function handleClickOutside(e: MouseEvent | TouchEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    onChange(val); // Always keep form value in sync with typed text
    setQuery(val);
    if (val.length < 2) {
      setIsOpen(false);
      clearSuggestions();
    }
  };

  const selectSuggestion = useCallback(
    (suggestion: LocationSuggestion) => {
      // Use the full formatted address so the user gets all detail
      const displayValue = suggestion.displayName;
      setInputValue(displayValue);
      onChange(displayValue);
      setIsOpen(false);
      setActiveIndex(-1);
      clearSuggestions();
      inputRef.current?.focus();
    },
    [onChange, clearSuggestions]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowDown":
        if (!isOpen) {
          setIsOpen(true);
          return;
        }
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, -1));
        break;
      case "Enter":
        if (isOpen && activeIndex >= 0 && suggestions[activeIndex]) {
          e.preventDefault();
          selectSuggestion(suggestions[activeIndex]);
        } else {
          // User presses Enter without a selection — keep their typed text and close
          setIsOpen(false);
          setActiveIndex(-1);
        }
        break;
      case "Escape":
        setIsOpen(false);
        setActiveIndex(-1);
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  // Scroll active item into view
  useEffect(() => {
    if (activeIndex >= 0 && listRef.current) {
      const activeEl = listRef.current.children[activeIndex] as HTMLElement;
      activeEl?.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const handleClear = () => {
    setInputValue("");
    onChange("");
    setQuery("");
    clearSuggestions();
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const showDropdown =
    isOpen && (suggestions.length > 0 || isLoading || !!error || inputValue.length >= 2);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {/* Input */}
      <div className="relative">
        <MapPin
          className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none"
          aria-hidden="true"
        />
        <input
          ref={inputRef}
          id={inputId}
          name={name}
          type="text"
          role="combobox"
          autoComplete="off"
          spellCheck={false}
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-haspopup="listbox"
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-item-${activeIndex}` : undefined
          }
          aria-describedby={ariaDescribedby}
          aria-autocomplete="list"
          disabled={disabled}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (inputValue.length >= 2 && (suggestions.length > 0 || error)) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border bg-gray-50/50 py-3 pl-10 pr-10 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all",
            "focus:border-brand-blue focus:bg-white focus:ring-2 focus:ring-brand-blue/20",
            hasError
              ? "border-red-400 focus:border-red-400 focus:ring-red-400/20 bg-white"
              : "border-gray-200",
            disabled && "cursor-not-allowed opacity-60"
          )}
        />

        {/* Right icon: loader | clear | chevron */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {isLoading ? (
            <Loader2
              className="h-4 w-4 animate-spin text-brand-blue"
              aria-label="Searching..."
            />
          ) : inputValue ? (
            <button
              type="button"
              onClick={handleClear}
              className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-gray-500 hover:bg-gray-300 transition-colors"
              aria-label="Clear location"
              tabIndex={-1}
            >
              <X className="h-3 w-3" aria-hidden="true" />
            </button>
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" aria-hidden="true" />
          )}
        </div>
      </div>

      {/* Dropdown */}
      {showDropdown && (
        <div
          role="listbox"
          id={listboxId}
          aria-label="Location suggestions"
          className={cn(
            "absolute left-0 right-0 z-[60] mt-1.5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10"
          )}
        >
          <ul ref={listRef} className="max-h-60 overflow-y-auto py-1" aria-label="Suggestions">

            {/* Loading state */}
            {isLoading && suggestions.length === 0 && (
              <li className="flex items-center gap-3 px-4 py-3 text-sm text-gray-500">
                <Loader2
                  className="h-4 w-4 animate-spin text-brand-blue shrink-0"
                  aria-hidden="true"
                />
                <span>Searching locations...</span>
              </li>
            )}

            {/* Error state */}
            {!isLoading && error && (
              <li className="px-4 py-3">
                <p className="text-sm text-amber-700 font-medium">Connection issue</p>
                <p className="mt-0.5 text-xs text-gray-500">
                  Your typed address will be submitted as entered.
                </p>
              </li>
            )}

            {/* Suggestion items */}
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.id}
                id={`${listboxId}-item-${index}`}
                role="option"
                aria-selected={activeIndex === index}
                onMouseDown={(e) => {
                  e.preventDefault(); // Prevent input blur before we can fire click
                  selectSuggestion(suggestion);
                }}
                onMouseEnter={() => setActiveIndex(index)}
                className={cn(
                  "flex cursor-pointer items-start gap-3 px-4 py-2.5 transition-colors select-none",
                  activeIndex === index
                    ? "bg-brand-blue/5 text-brand-blue"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <MapPin
                  className={cn(
                    "mt-0.5 h-4 w-4 shrink-0",
                    activeIndex === index ? "text-brand-blue" : "text-gray-400"
                  )}
                  aria-hidden="true"
                />
                <div className="min-w-0 flex-1">
                  {/* Primary: most specific part */}
                  <p className="text-sm font-medium leading-tight">
                    <HighlightedText text={suggestion.shortName} query={inputValue} />
                  </p>
                  {/* Secondary: state / city context */}
                  {suggestion.secondaryName && (
                    <p className="mt-0.5 truncate text-xs text-gray-400">
                      {suggestion.secondaryName}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Footer hint — always visible when dropdown is open */}
          {!isLoading && (
            <div className="border-t border-gray-100 px-4 py-2">
              <p className="text-[10px] text-gray-400">
                Can&apos;t find your location?{" "}
                <span className="font-medium">Just type your full address above.</span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
