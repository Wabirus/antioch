"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, PlayCircle, Calendar, User, BookOpen, Clock, ChevronDown } from "lucide-react";

// Define interface compatible with DB data but formatted for UI
export interface UISermon {
    id: string;
    title: string;
    speaker: string;
    date: string; // Formatted date string
    videoUrl: string;
    thumbnail: string; // nullable in DB but we handle fallback
    series: string | null;
    description: string;
    shortDescription: string;
    featured: boolean;
    topic: string[]; // UI expects array, DB provides single string -> we wrap it
    scripture: string;
    duration: string; // Formatted duration
}

interface SermonListProps {
    sermons: UISermon[];
    seriesList: string[];
    topicsList: string[];
    speakersList: string[];
}

export default function SermonList({ sermons: allSermons, seriesList, topicsList, speakersList }: SermonListProps) {

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSeries, setSelectedSeries] = useState("all");
    const [selectedTopic, setSelectedTopic] = useState("all");
    const [selectedSpeaker, setSelectedSpeaker] = useState("all");

    const filteredSermons = useMemo(() => {
        return allSermons.filter(sermon => {
            const matchesSearch =
                searchQuery === "" ||
                sermon.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sermon.description.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesSeries = selectedSeries === "all" || sermon.series === selectedSeries;
            const matchesTopic = selectedTopic === "all" || (sermon.topic && sermon.topic.includes(selectedTopic));
            const matchesSpeaker = selectedSpeaker === "all" || sermon.speaker === selectedSpeaker;

            return matchesSearch && matchesSeries && matchesTopic && matchesSpeaker;
        });
    }, [searchQuery, selectedSeries, selectedTopic, selectedSpeaker, allSermons]);

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedSeries("all");
        setSelectedTopic("all");
        setSelectedSpeaker("all");
    };

    const selectClassName = "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none";

    return (
        <div className="space-y-10">
            {/* Search and Filters */}
            <div className="bg-white p-6 rounded-xl shadow-soft border border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search sermons..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <div className="relative">
                        <select
                            value={selectedSeries}
                            onChange={(e) => setSelectedSeries(e.target.value)}
                            className={selectClassName}
                        >
                            <option value="all">All Series</option>
                            {seriesList.map(series => (
                                <option key={series} value={series}>{series}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
                    </div>

                    <div className="relative">
                        <select
                            value={selectedTopic}
                            onChange={(e) => setSelectedTopic(e.target.value)}
                            className={selectClassName}
                        >
                            <option value="all">All Topics</option>
                            {topicsList.map(topic => (
                                <option key={topic} value={topic}>{topic}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
                    </div>

                    <div className="relative">
                        <select
                            value={selectedSpeaker}
                            onChange={(e) => setSelectedSpeaker(e.target.value)}
                            className={selectClassName}
                        >
                            <option value="all">All Speakers</option>
                            {speakersList.map(speaker => (
                                <option key={speaker} value={speaker}>{speaker}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-3 h-4 w-4 opacity-50 pointer-events-none" />
                    </div>
                </div>

                <div className="mt-4 flex justify-end">
                    <Button
                        variant="ghost"
                        onClick={clearFilters}
                        className="text-muted-foreground hover:text-primary"
                    >
                        Clear Filters
                    </Button>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSermons.length > 0 ? (
                    filteredSermons.map(sermon => (
                        <Card key={sermon.id} className="group overflow-hidden border-none shadow-soft hover:shadow-medium transition-all duration-300">
                            <div className="relative aspect-video bg-gray-900 overflow-hidden">
                                {/* Fallback pattern if no thumbnail */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-secondary/80 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                                    <PlayCircle className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                                </div>
                                {sermon.thumbnail && (
                                    <img src={sermon.thumbnail} alt={sermon.title} className="absolute inset-0 w-full h-full object-cover" />
                                )}
                                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                                    {sermon.duration || "45:00"}
                                </div>
                            </div>
                            <CardContent className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2 py-1 rounded">
                                        {sermon.series || "Sermon"}
                                    </span>
                                    <div className="flex items-center text-muted-foreground text-xs gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {sermon.date}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{sermon.title}</h3>
                                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{sermon.shortDescription || sermon.description}</p>

                                <div className="space-y-2 text-sm text-gray-500">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-primary" />
                                        <span>{sermon.speaker}</span>
                                    </div>
                                    {sermon.scripture && (
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-primary" />
                                            <span>{sermon.scripture}</span>
                                        </div>
                                    )}
                                </div>

                                <Button className="w-full mt-6" variant="outline">
                                    Watch Now
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <h3 className="text-2xl font-bold text-gray-400 mb-2">No sermons found</h3>
                        <p className="text-gray-500">Try adjusting your search or filters to find what you're looking for.</p>
                        <Button variant="link" onClick={clearFilters} className="mt-4 text-primary">Clear all filters</Button>
                    </div>
                )}
            </div>
        </div>
    );
}
