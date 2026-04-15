import { render, screen } from '@testing-library/react';

import LiveStreamPlayer from '@/components/streaming/LiveStreamPlayer';

describe('LiveStreamPlayer', () => {
  it('renders iframe with normalized embed URL', () => {
    render(
      <LiveStreamPlayer embedUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
    );

    const iframe = screen.getByTitle('Live stream');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  });

  it('renders fallback when URL is missing or invalid', () => {
    const { rerender } = render(<LiveStreamPlayer embedUrl="" />);

    expect(
      screen.getByText('No live stream is currently available. Please check back later.')
    ).toBeInTheDocument();

    rerender(<LiveStreamPlayer embedUrl="https://example.com/not-youtube" />);

    expect(
      screen.getByText('No live stream is currently available. Please check back later.')
    ).toBeInTheDocument();
  });

  it('renders platform links when provided', () => {
    render(
      <LiveStreamPlayer
        embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        youtubeUrl="https://youtu.be/dQw4w9WgXcQ"
        facebookUrl="https://www.facebook.com/watch/?v=123"
      />
    );

    expect(
      screen.getByRole('link', { name: 'Watch on YouTube' })
    ).toHaveAttribute('href', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ');
    expect(
      screen.getByRole('link', { name: 'Watch on Facebook' })
    ).toHaveAttribute('href', 'https://www.facebook.com/watch/?v=123');
  });

  it('uses responsive video wrapper layout', () => {
    const { container } = render(
      <LiveStreamPlayer embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" />
    );

    const playerShell = container.querySelector('.playerShell');
    const videoWrap = container.querySelector('.videoWrap');

    expect(playerShell).toBeInTheDocument();
    expect(videoWrap).toBeInTheDocument();
    expect(videoWrap?.querySelector('iframe')).toBeInTheDocument();
  });
});
