import { fireEvent, render, screen, act as import_act } from '@testing-library/react';

import VideoEmbed from '@/components/VideoEmbed';

describe('VideoEmbed', () => {
  it('renders iframe with correct URL', () => {
    render(
      <VideoEmbed
        embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Live service"
      />
    );

    const iframe = screen.getByTitle('Live service');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      'src',
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    );
  });

  it('renders fallback after iframe load timeout', () => {
    jest.useFakeTimers();
    render(
      <VideoEmbed
        embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
        title="Live service"
      />
    );

    // fast-forward 10 seconds to trigger the timeout fallback
    // Use act to flush state updates
    import_act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(
      screen.getByText(
        /Service is currently offline\. Please check back during service hours\./i
      )
    ).toBeInTheDocument();

    jest.useRealTimers();
  });

  it('uses responsive container layout class', () => {
    const { container } = render(
      <VideoEmbed embedUrl="https://www.youtube.com/embed/dQw4w9WgXcQ" />
    );

    const wrapper = container.querySelector('.video-container');
    expect(wrapper).toBeInTheDocument();
    expect(wrapper?.querySelector('iframe')).toBeInTheDocument();
  });
});
