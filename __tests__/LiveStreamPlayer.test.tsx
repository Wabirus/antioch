import { render, screen } from '@testing-library/react';

import LiveStreamPlayer from '@/components/streaming/LiveStreamPlayer';

describe('LiveStreamPlayer', () => {
  it('renders iframe with normalized embed URL', () => {
    render(
      <LiveStreamPlayer embedUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ" />
    );

    const iframe = screen.getByTitle('YouTube live stream');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  });

  it('renders fallback when URL is missing or invalid', () => {
    const { rerender } = render(<LiveStreamPlayer embedUrl="" />);

    expect(
      screen.getByText('No live stream is available right now.')
    ).toBeInTheDocument();

    rerender(<LiveStreamPlayer embedUrl="https://example.com/not-youtube" />);

    expect(
      screen.getByText('No live stream is available right now.')
    ).toBeInTheDocument();
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
