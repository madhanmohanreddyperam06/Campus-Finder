
'use client';

import { useEffect, useState } from 'react';
import { useComparison } from '@/hooks/use-comparison';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GitCompareArrows, University, Check, X, Sparkles, Bot, HardHat, Trophy, Star, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ComparisonResult, CompareInstitutionsInput } from '@/lib/ai-types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { Institution } from '@/lib/types';
import { Separator } from '@/components/ui/separator';

function ComparisonRow({ label, value1, value2 }: { label: string; value1: React.ReactNode; value2: React.ReactNode; }) {
    return (
        <div className="grid grid-cols-3 items-center gap-4 border-b py-4 last:border-b-0">
            <p className="font-semibold text-right text-sm text-muted-foreground">{label}</p>
            <div className="text-center text-sm">{value1}</div>
            <div className="text-center text-sm">{value2}</div>
        </div>
    );
}

function calculateScore(inst: Institution): number {
    let score = 0;

    // Rating (out of 5, contributes up to 4 points)
    if (inst.rating) {
        score += (inst.rating / 5) * 4;
    }

    // NIRF Rank (contributes up to 3 points)
    if (inst.nirfRank) {
        const rank = parseInt(inst.nirfRank.split(' ')[0], 10);
        if (rank <= 10) score += 3;
        else if (rank <= 50) score += 2;
        else if (rank <= 100) score += 1;
    }

    // NAAC Grade (contributes up to 1.5 points)
    const gradeScores: { [key: string]: number } = { 'A++': 1.5, 'A+': 1.2, 'A': 1.0, 'B++': 0.7, 'B+': 0.5 };
    if (inst.naacGrade && gradeScores[inst.naacGrade]) {
        score += gradeScores[inst.naacGrade];
    }
    
    // Placements (contributes up to 1.5 points)
    if (inst.placements?.averagePackage) {
        const avgPackage = parseFloat(inst.placements.averagePackage);
        if (avgPackage >= 20) score += 1.5;
        else if (avgPackage >= 10) score += 1;
        else if (avgPackage >= 5) score += 0.5;
    }

    return Math.min(parseFloat(score.toFixed(1)), 10); // Cap score at 10
}

function mockAiComparison(inst1: Institution, inst2: Institution): ComparisonResult {
    const score1 = calculateScore(inst1);
    const score2 = calculateScore(inst2);

    const featureComparison = [
        {
            feature: 'Placements (Avg)',
            institution1Value: inst1.placements?.averagePackage || 'N/A',
            institution2Value: inst2.placements?.averagePackage || 'N/A',
            winner: (parseFloat(inst1.placements?.averagePackage || '0') > parseFloat(inst2.placements?.averagePackage || '0')) ? 'institution1' : 'institution2'
        },
        {
            feature: 'NIRF Ranking',
            institution1Value: inst1.nirfRank || 'N/A',
            institution2Value: inst2.nirfRank || 'N/A',
            winner: (parseInt(inst1.nirfRank || '999') < parseInt(inst2.nirfRank || '999')) ? 'institution1' : 'institution2'
        },
        {
            feature: 'User Rating',
            institution1Value: `${inst1.rating}/5`,
            institution2Value: `${inst2.rating}/5`,
            winner: inst1.rating > inst2.rating ? 'institution1' : 'institution2'
        },
    ] as ComparisonResult['featureComparison'];
    
    const recommended = score1 >= score2 ? inst1 : inst2;
    const other = score1 < score2 ? inst1 : inst2;

    return {
        featureComparison,
        institution1Score: score1,
        institution2Score: score2,
        recommendedInstitution: recommended.name,
        recommendationReason: `${recommended.name} is recommended due to its superior overall score, excelling in areas like placements and user ratings compared to ${other.name}.`
    };
}


export default function ComparePage() {
    const { comparisonItems, clearComparison } = useComparison();
    const [isClient, setIsClient] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [aiResult, setAiResult] = useState<ComparisonResult | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleCompare = async () => {
        setIsLoading(true);
        setError(null);
        setAiResult(null);
        await new Promise(resolve => setTimeout(resolve, 1500));
        try {
            const [inst1, inst2] = comparisonItems;
            const result = mockAiComparison(inst1, inst2);
            setAiResult(result);
        } catch (e) {
            setError('An error occurred during AI analysis.');
        } finally {
            setIsLoading(false);
        }
    };
    
    if (!isClient) {
        return <div className="text-center">Loading comparison...</div>;
    }
    
    const [inst1, inst2] = comparisonItems;

    if (comparisonItems.length < 2) {
        return (
            <div className="flex h-[calc(100vh-15rem)] flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted bg-card text-center p-4">
                <GitCompareArrows className="h-16 w-16 text-muted-foreground" />
                <h2 className="mt-6 text-2xl font-semibold">
                    {comparisonItems.length === 0 ? 'No Institutions Selected' : 'Select One More Institution'}
                </h2>
                <p className="mt-2 text-muted-foreground">
                    You need to select two institutions to compare.
                </p>
                {comparisonItems.length === 1 && (
                    <div className="mt-4 rounded-lg border p-4">
                        <p className="font-semibold">Selected:</p>
                        <p>{inst1.name}</p>
                    </div>
                )}
                <Button asChild className="mt-6">
                    <Link href="/search">Browse Institutions</Link>
                </Button>
            </div>
        );
    }

    const score1 = calculateScore(inst1);
    const score2 = calculateScore(inst2);

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-wrap items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-4xl font-headline font-bold text-primary md:text-5xl">Compare Institutions</h1>
                    <p className="mt-2 text-lg text-muted-foreground">A side-by-side analysis of your selected institutions.</p>
                </div>
                <Button variant="destructive" onClick={() => { clearComparison(); setAiResult(null); }}>Clear Selection</Button>
            </motion.div>
            
            <Card>
                <CardHeader>
                    <div className="grid grid-cols-3 gap-4">
                        <div />
                        <CardTitle className="text-center">{inst1.name}</CardTitle>
                        <CardTitle className="text-center">{inst2.name}</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="divide-y">
                    <ComparisonRow label="Type" value1={inst1.type} value2={inst2.type} />
                    <ComparisonRow label="Established" value1={inst1.establishmentYear} value2={inst2.establishmentYear} />
                    <ComparisonRow label="Affiliations" value1={inst1.affiliations.join(', ')} value2={inst2.affiliations.join(', ')} />
                    <ComparisonRow label="NIRF Ranking" value1={inst1.nirfRank || 'N/A'} value2={inst2.nirfRank || 'N/A'} />
                    <ComparisonRow label="NAAC Grade" value1={inst1.naacGrade || 'N/A'} value2={inst2.naacGrade || 'N/A'} />
                    <ComparisonRow label="User Rating" value1={`${inst1.rating}/5`} value2={`${inst2.rating}/5`} />
                    <ComparisonRow label="Avg. Package" value1={inst1.placements?.averagePackage || 'N/A'} value2={inst2.placements?.averagePackage || 'N/A'} />
                    <ComparisonRow label="Highest Package" value1={inst1.placements?.highestPackage || 'N/A'} value2={inst2.placements?.highestPackage || 'N/A'} />
                    <ComparisonRow label="Top Recruiters" value1={inst1.placements?.topRecruiters.slice(0, 2).join(', ') || 'N/A'} value2={inst2.placements?.topRecruiters.slice(0, 2).join(', ') || 'N/A'} />
                    <Separator className="my-4" />
                    <div className="grid grid-cols-3 items-center gap-4 py-4">
                        <p className="font-bold text-right text-primary">Overall Score</p>
                        <div className="text-center text-3xl font-bold text-primary">{score1}/10</div>
                        <div className="text-center text-3xl font-bold text-primary">{score2}/10</div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Bot />
                        AI-Powered Analysis
                    </CardTitle>
                     <CardDescription>
                        Click the button below for an advanced, AI-driven comparison.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 text-center">
                    <Button size="lg" onClick={handleCompare} disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Bot className="mr-2 h-4 w-4 animate-spin" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Compare with AI
                            </>
                        )}
                    </Button>
                    
                    {error && <p className="text-destructive">{error}</p>}

                    {aiResult && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6 pt-6 text-left"
                        >
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Trophy /> Feature-by-Feature Winner</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {aiResult.featureComparison.map(feature => (
                                        <div key={feature.feature} className="grid grid-cols-3 items-center gap-2 py-2 border-b">
                                            <p className="font-semibold">{feature.feature}</p>
                                            <p className={cn("text-center p-1 rounded-md", feature.winner === 'institution1' && 'bg-green-100 text-green-800 font-bold')}>{feature.institution1Value}</p>
                                            <p className={cn("text-center p-1 rounded-md", feature.winner === 'institution2' && 'bg-green-100 text-green-800 font-bold')}>{feature.institution2Value}</p>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2"><Star /> AI Score: {inst1.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <p className="text-5xl font-bold text-primary">{aiResult.institution1Score}/10</p>
                                    </CardContent>
                                </Card>
                                <Card>
                                     <CardHeader>
                                        <CardTitle className="flex items-center gap-2"><Star /> AI Score: {inst2.name}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-center">
                                        <p className="text-5xl font-bold text-primary">{aiResult.institution2Score}/10</p>
                                    </CardContent>
                                </Card>
                             </div>

                             <Card className="bg-primary/5">
                                 <CardHeader>
                                     <CardTitle className="flex items-center gap-2"><TrendingUp /> Final Recommendation</CardTitle>
                                     <CardDescription>Based on the analysis, our AI recommends:</CardDescription>
                                 </CardHeader>
                                 <CardContent>
                                     <h3 className="text-2xl font-bold text-primary text-center">{aiResult.recommendedInstitution}</h3>
                                     <p className="mt-4 text-center text-muted-foreground">{aiResult.recommendationReason}</p>
                                 </CardContent>
                             </Card>
                        </motion.div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
