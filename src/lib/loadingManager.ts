// =============================================================
// LOADING MANAGER — lib/loadingManager.ts
// Centralized singleton state manager for loading
// =============================================================

type Listener = (loading: boolean) => void;

class LoadingManager {
  private _isLoading = true;
  private _listeners: Set<Listener> = new Set();

  get isLoading(): boolean {
    return this._isLoading;
  }

  show(): void {
    this._set(true);
  }

  hide(): void {
    this._set(false);
  }

  subscribe(listener: Listener): () => void {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  private _set(value: boolean): void {
    if (this._isLoading === value) return;
    this._isLoading = value;
    this._listeners.forEach((fn) => fn(value));
  }
}

// Singleton instance — shared across the app
export const loadingManager = new LoadingManager();
