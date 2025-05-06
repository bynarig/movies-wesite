import '@vidstack/react/player/styles/base.css';

import {useEffect, useRef, useState} from 'react';
import {
    isHLSProvider,
    MediaPlayer,
    MediaProvider,
    Poster,
    type MediaCanPlayDetail,
    type MediaCanPlayEvent,
    type MediaPlayerInstance,
    type MediaProviderAdapter,
    type MediaProviderChangeEvent
} from '@vidstack/react';

import {VideoLayout} from './components/layouts/video-layout';

// import {textTracks} from './tracks';

export interface VideoPlayerProps {
    className?: string;
    src: string;
    poster?: string;
    // textTracks?: TrackProps[];
    controls?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    preload?: 'none' | 'metadata' | 'auto';
    playsInline?: boolean;
    crossOrigin?: 'anonymous' | 'use-credentials';
    thumbnails?: string;
    title?: string;
    layoutViewTime?: number;
}

export function VideoPlayer({
                                className,
                                src,
                                title,
                                poster,
                                controls,
                                autoplay,
                                loop,
                                muted,
                                preload,
                                playsInline,
                                crossOrigin,
                                thumbnails,
                                layoutViewTime = 3
                            }: VideoPlayerProps
) {
    let player = useRef<MediaPlayerInstance>(null);


    const [isLayoutVisible, setIsLayoutVisible] = useState(true);

    useEffect(() => {
        const mediaPlayer = player.current;
        if (!mediaPlayer) return;

        const el = mediaPlayer.el;
        if (!el) return;

        let timeoutId: number;

        const hideLayout = () => setIsLayoutVisible(false);
        const handleActivity = () => {
            setIsLayoutVisible(true);
            clearTimeout(timeoutId);
            timeoutId = window.setTimeout(hideLayout, layoutViewTime * 1000);
        };

        // Initial hide timeout
        timeoutId = window.setTimeout(hideLayout, layoutViewTime * 1000);

        // Event listeners
        el.addEventListener('mousemove', handleActivity);
        el.addEventListener('touchstart', handleActivity);
        el.addEventListener('click', handleActivity);
        return () => {
            clearTimeout(timeoutId);
            el.removeEventListener('mousemove', handleActivity);
            el.removeEventListener('touchstart', handleActivity);
            el.removeEventListener('click', handleActivity);
        };
    }, []);

    function onProviderChange(
        provider: MediaProviderAdapter | null,
        nativeEvent: MediaProviderChangeEvent,
    ) {
        // We can configure provider's here.
        if (isHLSProvider(provider)) {
            provider.config = {};
        }
    }

    // We can listen for the `can-play` event to be notified when the player is ready.
    function onCanPlay(detail: MediaCanPlayDetail, nativeEvent: MediaCanPlayEvent) {
        // ...
    }

    return (
        <MediaPlayer
            className={`${className} aspect-video bg-none text-white font-sans overflow-hidden rounded-md ring-media-focus data-[focus]:ring-4 select-none cursor-default`}
            title={title}
            src={src}
            crossOrigin
            playsInline
            onProviderChange={onProviderChange}
            onCanPlay={onCanPlay}
            ref={player}
        >
            <MediaProvider>
                <Poster
                    className="absolute inset-0 block h-full w-full rounded-md opacity-0 transition-opacity data-[visible]:opacity-100 object-cover"
                    src={poster}
                    alt={title}
                />
                {/*{textTracks.map((track) => (*/}
                {/*  <Track {...track} key={track.src} />*/}
                {/*))}*/}
            </MediaProvider>

            <VideoLayout thumbnails={thumbnails} title={title} isVisible={isLayoutVisible}/>
        </MediaPlayer>
    );
}
