import { renderHook } from '@testing-library/react';
import { useMap } from './';
import { Map, TileLayer } from 'leaflet';
import { vi } from 'vitest';
import { OfferCity } from '../../types/offer';
import { Cities, DEFAULT_ZOOM } from '../../constants';

const mockMapInstance = {
  addLayer: vi.fn(),
  remove: vi.fn(),
  setView: vi.fn(),
};

vi.mock('leaflet', () => ({
  Map: vi.fn(() => mockMapInstance),
  TileLayer: vi.fn(() => ({
    addTo: vi.fn(),
  })),
}));

describe('useMap', () => {
  const mockCity: OfferCity = {
    name: Cities.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  };

  const mockMapRef = {
    current: document.createElement('div'),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize map with correct parameters', () => {
    const { result } = renderHook(() => useMap(mockMapRef, mockCity));

    expect(Map).toHaveBeenCalledWith(mockMapRef.current, {
      center: {
        lat: mockCity.location.latitude,
        lng: mockCity.location.longitude,
      },
      zoom: DEFAULT_ZOOM,
    });

    expect(result.current).toBeTruthy();
  });

  it('should add tile layer with correct URL and attribution', () => {
    renderHook(() => useMap(mockMapRef, mockCity));

    expect(TileLayer).toHaveBeenCalledWith('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    });
  });

  it('should not initialize map without city data', () => {
    vi.mocked(Map).mockClear();
    const { result } = renderHook(() => useMap(mockMapRef, undefined));

    expect(Map).not.toHaveBeenCalled();
    expect(result.current).toBeNull();
  });

  it('should not initialize map without map container', () => {
    vi.mocked(Map).mockClear();
    const emptyRef = { current: null };
    const { result } = renderHook(() => useMap(emptyRef, mockCity));

    expect(Map).not.toHaveBeenCalled();
    expect(result.current).toBeNull();
  });

  it('should not reinitialize map when city changes', () => {
    vi.mocked(Map).mockClear();
    const { rerender } = renderHook(({ city }) => useMap(mockMapRef, city), {
      initialProps: { city: mockCity },
    });

    const newCity: OfferCity = {
      ...mockCity,
      location: {
        ...mockCity.location,
        latitude: 51.5074,
        longitude: -0.1278,
      },
    };

    rerender({ city: newCity });

    expect(Map).toHaveBeenCalledTimes(1);
  });
});
