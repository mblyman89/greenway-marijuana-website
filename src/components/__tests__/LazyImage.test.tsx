import React from 'react';
import { render, screen } from '@testing-library/react';
import LazyImage from '../LazyImage';

// Mock the useLazyLoad hook
jest.mock('../../hooks/useLazyLoad', () => ({
  __esModule: true,
  default: () => ({
    ref: jest.fn(),
    isVisible: true,
  }),
}));

describe('LazyImage Component', () => {
  const defaultProps = {
    src: 'https://example.com/image.jpg',
    alt: 'Test image',
    width: 300,
    height: 200,
  };

  it('renders correctly with default props', () => {
    render(<LazyImage {...defaultProps} />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('renders with priority loading when specified', () => {
    render(<LazyImage {...defaultProps} priority={true} />);
    const img = screen.getByAltText('Test image');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('loading', 'eager');
  });

  it('applies custom className when provided', () => {
    render(<LazyImage {...defaultProps} className="custom-class" />);
    const img = screen.getByAltText('Test image');
    expect(img).toHaveClass('custom-class');
  });

  it('maintains aspect ratio based on width and height', () => {
    const { container } = render(<LazyImage {...defaultProps} />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveStyle('padding-bottom: 66.66666666666666%');
  });

  it('shows placeholder before image is loaded', () => {
    const { container } = render(<LazyImage {...defaultProps} placeholderColor="#ff0000" />);
    const placeholder = container.querySelector('div:nth-child(1)');
    expect(placeholder).toHaveStyle('background-color: #ff0000');
  });
});