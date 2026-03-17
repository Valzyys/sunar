import { 
    RadioIcon, 
    UsersIcon, 
    CalendarIcon, 
    NewspaperIcon, 
    PlayCircleIcon, 
    Code2Icon, 
    type LucideIcon 
} from "lucide-react";
import Link from "next/link";

import { FancyButton } from "@/components/fancy-button";

export function HomeHeroSection() {
    return (
        <section className="relative flex h-full w-full flex-col gap-y-4 overflow-hidden rounded-2xl border p-6 pt-8 md:p-12">
            <div
                className="-z-10 absolute inset-0"
                style={{
                    background: "radial-gradient(135% 135% at 50% 90%, transparent 40%, var(--color-fd-primary) 200%)",
                }}
            />
            <div
                className="-z-10 absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(
                          to right,
                          color-mix(in srgb, var(--color-fd-muted) 30%, transparent) 1px,
                          transparent 1px
                        ),
                        linear-gradient(
                          to bottom,
                          color-mix(in srgb, var(--color-fd-muted) 30%, transparent) 1px,
                          transparent 1px
                        )
                      `,
                    backgroundSize: "20px 30.3px",
                    WebkitMaskImage: "radial-gradient(ellipse 90% 70 at 50% 100%, var(--color-fd-primary) 60%, transparent 100%)",
                    maskImage: "radial-gradient(ellipse 90% 70% at 50% 100%, var(--color-fd-primary) 60%, transparent 100%)",
                }}
            />

            <h1 className="relative text-balance font-medium text-4xl text-fd-foreground text-shadow-lg tracking-tight">
                The ultimate JKT48 data platform
            </h1>

            <p className="relative max-w-5xl text-balance text-fd-foreground/80 text-shadow-lg sm:text-lg md:text-xl lg:text-xl">
                JKT48Connect provides the most comprehensive REST API for JKT48 data, delivering{" "}
                <span className="text-fd-foreground">real-time updates and seamless integration</span> for developers and fans alike.
            </p>

            <div className="relative mt-2 flex items-center gap-x-2">
                <Link href="/docs/getting-started">
                    <FancyButton label="Get Started" withArrow />
                </Link>
            </div>

            <div className="-z-10 relative mt-10 grid grid-cols-1 overflow-hidden sm:grid-cols-2 md:grid-cols-3 md:gap-8">
                <Highlight title="Live Streaming" icon={RadioIcon}>
                    Real-time live data from IDN Live, Showroom, and YouTube with chat stream support.
                </Highlight>
                <Highlight title="Member Data" icon={UsersIcon}>
                    Complete member profiles, birthdays, and statistics from JKT48, JKT48V, and trainees.
                </Highlight>
                <Highlight title="Theater Schedule" icon={CalendarIcon}>
                    Up-to-date theater schedules, setlists, and ticket information.
                </Highlight>
                <Highlight title="News & Events" icon={NewspaperIcon}>
                    Latest news, off-air events, and official announcements from JKT48.
                </Highlight>
                <Highlight title="Replays" icon={PlayCircleIcon}>
                    Access to theater replays, live streaming archives, and video content.
                </Highlight>
                <Highlight title="Developer Friendly" icon={Code2Icon}>
                    TypeScript support with official npm package @jkt48/core and Discord bot integration.
                </Highlight>
            </div>
        </section>
    );
}

interface HighlightPros extends React.PropsWithChildren {
    title: string;
    icon: LucideIcon;
}

function Highlight({ icon: IconComp, title, children }: HighlightPros) {
    return (
        <div className="py-2 sm:py-4 md:py-6">
            <div className="mb-1.5 flex items-center gap-x-2 text-fd-muted-foreground sm:mb-3">
                <IconComp className="size-3 md:size-4" />
                <h4 className="font-normal text-sm sm:text-xs md:font-medium md:text-sm">{title}</h4>
            </div>
            <p className="text-pretty text-base sm:text-sm md:text-base">{children}</p>
        </div>
    );
}
