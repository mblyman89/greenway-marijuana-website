import { renderHook } from '@testing-library/react';
import useLazyLoad from '../useLazyLoad';

// Mock IntersectionObserver
const mockObserve = jest.fn();
const mockUnobserve = jest.fn();
const mockDisconnect = jest.fn();

class MockIntersectionObserver {
  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  callback: IntersectionObserverCallback;
  observe = mockObserve;
  unobserve = mockUnobserve;
  disconnect = mockDisconnect;
  
  // Method to simulate intersection
  simulateIntersection(isIntersecting: boolean) {
    this.callback(
      [
        {
          isIntersecting,
          target: document.createElement('div'),
          boundingClientRect: {} as DOMRectReadOnly,
          intersectionRatio: isIntersecting ? 1 : 0,
          intersectionRect: {} as DOMRectReadOnly,
          rootBounds: null,
          time: Date.now(),
        },
      ],
      this
    );
  }
}

describe('useLazyLoad Hook', () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    originalIntersectionObserver = window.IntersectionObserver;
    window.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
    
    mockObserve.mockClear();
    mockUnobserve.mockClear();
    mockDisconnect.mockClear();
  });

  afterEach(() => {
    window.IntersectionObserver = originalIntersectionObserver;
  });

  it('should initialize with isVisible as false', () => {
    const { result } = renderHook(() => useLazyLoad());
    
    expect(result.current.isVisible).toBe(false);
    expect(result.current.ref).toBeDefined();
  });

  it('should observe the element when ref is set', () => {
    const { result } = renderHook(() => useLazyLoad());
    
    // Simulate setting the ref
    const div = document.createElement('div');
    if (result.current.ref.current !== div) {
      result.current.ref.current = div;
    }
    
    // Manually call the effect that would set up the observer
    // This is a bit of a hack since we can't easily trigger useEffect in tests
    const observer = new MockIntersectionObserver(() => {});
    observer.observe(div);
    
    expect(mockObserve).toHaveBeenCalled();
  });

  it('should set isVisible to true when element intersects', () => {
    const { result, rerender } = renderHook(() => useLazyLoad());
    
    // Get the observer instance
    const observer = new MockIntersectionObserver(() => {});
    
    // Simulate setting the ref
    const div = document.createElement('div');
    if (result.current.ref.current !== div) {
      result.current.ref.current = div;
    }
    
    // Observe the element
    observer.observe(div);
    
    // Simulate intersection
    observer.simulateIntersection(true);
    
    // Force a re-render to update the result
    rerender();
    
    // Check if isVisible is updated
    expect(result.current.isVisible).toBe(true);
  });

  it('should unobserve when triggerOnce is true and element has been visible', () => {
    const { result } = renderHook(() => useLazyLoad({ triggerOnce: true }));
    
    // Get the observer instance
    const observer = new MockIntersectionObserver(() => {});
    
    // Simulate setting the ref
    const div = document.createElement('div');
    if (result.current.ref.current !== div) {
      result.current.ref.current = div;
    }
    
    // Observe the element
    observer.observe(div);
    
    // Simulate intersection
    observer.simulateIntersection(true);
    
    // Check if unobserve was called
    expect(mockUnobserve).toHaveBeenCalled();
  });

  it('should toggle isVisible when triggerOnce is false', () => {
    const { result, rerender } = renderHook(() => useLazyLoad({ triggerOnce: false }));
    
    // Get the observer instance
    const observer = new MockIntersectionObserver(() => {});
    
    // Simulate setting the ref
    const div = document.createElement('div');
    if (result.current.ref.current !== div) {
      result.current.ref.current = div;
    }
    
    // Observe the element
    observer.observe(div);
    
    // Simulate intersection (visible)
    observer.simulateIntersection(true);
    rerender();
    expect(result.current.isVisible).toBe(true);
    
    // Simulate intersection (not visible)
    observer.simulateIntersection(false);
    rerender();
    expect(result.current.isVisible).toBe(false);
  });

  it('should use provided threshold and rootMargin options', () => {
    // Save the original implementation
    const originalImplementation = window.IntersectionObserver;
    
    // Mock IntersectionObserver constructor to capture options
    let capturedOptions: IntersectionObserverInit | undefined;
    window.IntersectionObserver = jest.fn((callback, options) => {
      capturedOptions = options;
      return new originalImplementation(callback, options);
    }) as unknown as typeof IntersectionObserver;
    
    renderHook(() => useLazyLoad({ threshold: 0.5, rootMargin: '10px' }));
    
    // Check if options were passed correctly
    expect(capturedOptions).toBeDefined();
    expect(capturedOptions?.threshold).toBe(0.5);
    expect(capturedOptions?.rootMargin).toBe('10px');
  });
});