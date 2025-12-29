import { cn } from '@/lib/utils';
import { Card } from '@/components/ui/card';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    intensity?: 'low' | 'medium' | 'high';
}

export function GlassCard({ children, className, intensity = 'medium', ...props }: GlassCardProps) {
    const intensityMap = {
        low: 'bg-white/5 backdrop-blur-sm border-white/5',
        medium: 'bg-white/10 backdrop-blur-md border-white/10',
        high: 'bg-white/20 backdrop-blur-lg border-white/20',
    };

    return (
        <Card
            className={cn(
                "relative overflow-hidden border shadow-xl rounded-3xl",
                intensityMap[intensity],
                className
            )}
            {...props}
        >
            {/* Glossy reflection effect */}
            <div className="absolute inset-0 z-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />

            <div className="relative z-10">
                {children}
            </div>
        </Card>
    );
}
