import {Button} from "antd";
import {DownloadOutlined} from "@ant-design/icons";
import React, {useEffect, useMemo, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import useTokenStore from "@/app/tokenstore";

interface PastPaper {
    pastPaperId: string;
    title: string;
    year: number;
    examType: string;
    difficultyLevel: string;
    filePath: string;
    subjectId: number;
    categoryId: number;
    slug: string;
    examBoard: string;
}

interface ApiResponse {
    pastPapers: PastPaper[];
    pageSize: number;
    page: number;
    totalCount: number;
    hasNextPage: boolean;
}

const ProblemTable = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [year, setYear] = useState('');
    const [pastPapers, setPastPapers] = useState<PastPaper[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const rowsPerPage = 5;

    // useEffect(() => {
    //   const fetchPastPapers = async () => {
    //     setIsLoading(true);
    //     setError(null);
    //
    //     try {
    //       const token = useTokenStore.getState().token;
    //
    //       const params = new URLSearchParams({
    //         page: currentPage.toString(),
    //         pageSize: rowsPerPage.toString(),
    //         Title: searchQuery,
    //         Year: year,
    //         SortBy: 'Title',
    //         'api-version': '1.0'
    //       });
    //
    //       const response = await fetch(
    //           `http://localhost:5030/api/pastpaper/all?${params}`,
    //           {
    //             headers: {
    //               'Content-Type': 'application/json',
    //               'Authorization': `Bearer ${token}`
    //             }
    //           }
    //       );
    //
    //       if (!response.ok) throw new Error('Failed to fetch data');
    //
    //       const data: ApiResponse = await response.json();
    //       setPastPapers(data.pastPapers);
    //       setTotalCount(data.totalCount);
    //
    //     } catch (error) {
    //       setError(error instanceof Error ? error.message : 'Failed to load data');
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
    //
    //   fetchPastPapers();
    // }, [currentPage]);

    const fetchPastPapers = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const token = useTokenStore.getState().token;

            const params = new URLSearchParams({
                page: currentPage.toString(),
                pageSize: rowsPerPage.toString(),
                Title: searchQuery,
                Year: year,
                SortBy: 'Title',
                'api-version': '1.0'
            });

            const response = await fetch(
                `http://localhost:5030/api/pastpaper/all?${params}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            if (!response.ok) throw new Error('Failed to fetch data');

            const data: ApiResponse = await response.json();
            setPastPapers(data.pastPapers);
            setTotalCount(data.totalCount);

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };

    const totalPages = Math.ceil(totalCount / rowsPerPage);

    const handlePrev = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
    const handleNext = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchPastPapers(); // Explicitly call fetch
    };

    useEffect(() => {
        fetchPastPapers();
    }, [currentPage]);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case 'hard':
                return 'text-red-500';
            case 'intermediate':
                return 'text-yellow-500';
            case 'easy':
                return 'text-green-500';
            default:
                return 'text-gray-500';
        }
    };

    if (error) {
        return (
            <div className="p-6 text-center text-red-500">
                Error: {error}
            </div>
        );
    }

    const [sortConfig, setSortConfig] = useState<{
        key: 'title' | 'year';
        direction: 'asc' | 'desc';
    }>({key: 'title', direction: 'asc'});

    const sortedPastPapers = useMemo(() => {
        return [...pastPapers].sort((a, b) => {
            if (sortConfig.key === 'title') {
                return sortConfig.direction === 'asc'
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
            if (sortConfig.key === 'year') {
                return sortConfig.direction === 'asc'
                    ? a.year - b.year
                    : b.year - a.year;
            }
            return 0;
        });
    }, [pastPapers, sortConfig]);

    return (
        <div className="p-6">
            {/* Filters Section */}
            <div className="flex flex-wrap gap-4 mb-6 items-center">
                <select className="border border-gray-300 rounded px-4 py-2 text-sm w-full sm:w-auto">
                    <option value="" disabled selected hidden>
                        Exam Type
                    </option>
                    <option value="board">Board</option>
                    <option value="final">Final</option>
                </select>

                <select className="border border-gray-300 rounded px-4 py-2 text-sm w-full sm:w-auto">
                    <option value="" disabled selected hidden>
                        Difficulty
                    </option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>

                <select
                    className="border border-gray-300 rounded px-4 py-2 text-sm w-full sm:w-auto"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    <option value="" disabled hidden>
                        Year
                    </option>
                    <option value="2020">2020</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                </select>
                {/*<select className="border border-gray-300 rounded px-4 py-2 text-sm w-full sm:w-auto">*/}
                {/*  <option value="" disabled selected hidden>*/}
                {/*    Subject*/}
                {/*  </option>*/}
                {/*  <option value="2020">English</option>*/}
                {/*  <option value="2021">Math</option>*/}
                {/*  <option value="2022">2022</option>*/}
                {/*</select>*/}

                <div className="flex flex-grow gap-2 w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder="Search questions"
                        className="border border-gray-300 rounded px-4 py-2 text-sm w-full" value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button className="bg-purple-500 text-white px-4 py-[18px]" onClick={handleSearch}>
                        Search
                    </Button>
                </div>
            </div>

            {/* Table Section */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                    <thead>
                    <tr className="bg-gray-100 text-sm text-gray-600">
                        <th className="p-4 text-left">SN</th>
                        <th className="p-4 text-left" onClick={() => {
                            setSortConfig(prev => ({
                                key: 'title',
                                direction: prev.key === 'title' && prev.direction === 'asc' ? 'desc' : 'asc'
                            }));
                        }}>Title {sortConfig.key === 'title' && (
                            <span className="ml-1">
          {sortConfig.direction === 'asc' ? '↑' : '↓'}
        </span>
                        )}</th>
                        <th className="p-4 text-center">Exam Type</th>
                        <th className="p-4 text-center">Difficulty</th>
                        <th className="p-4 text-center" onClick={() => {
                            setSortConfig(prev => ({
                                key: 'year',
                                direction: prev.key === 'year' && prev.direction === 'asc' ? 'desc' : 'asc'
                            }));
                        }}>Year {sortConfig.key === 'year' && (
                            <span className="ml-1">
          {sortConfig.direction === 'asc' ? '↑' : '↓'}
        </span>
                        )}</th>
                        <th className="p-4 text-center">PDF</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedPastPapers.map((pastpaper, index) => (
                        <tr
                            key={pastpaper.pastPaperId}
                            className="border-b last:border-b-0 hover:bg-gray-50"
                        >
                            <td className="p-4 text-center">{(currentPage - 1) * rowsPerPage + index + 1}</td>
                            <td className="p-4 text-left font-medium text-gray-800">
                                {pastpaper.title}
                            </td>
                            <td className="p-4 text-center text-gray-600">
                                {pastpaper.examType}
                            </td>
                            <td className={`p-4 text-center font-semibold ${getDifficultyColor(pastpaper.difficultyLevel)}`}>
                                {pastpaper.difficultyLevel}
                            </td>
                            <td className="p-4 text-center text-gray-600">
                                {pastpaper.year}
                            </td>
                            <td className="p-4 text-center">
                                <a
                                    href={pastpaper.filePath}
                                    download
                                    className="text-purple-500 hover:text-purple-700"
                                    aria-label="Download PDF"
                                >
                                    <DownloadOutlined className="text-lg"/>
                                </a>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center mt-4">
                <Button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className="bg-gray-300 text-black px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Prev
                </Button>
                <span className="text-gray-600 text-sm">
          Page {currentPage} of {totalPages}
        </span>
                <Button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className="bg-gray-300 text-black px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default ProblemTable;
