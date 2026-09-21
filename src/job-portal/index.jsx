import { useEffect, useState } from "react"
import styled from "styled-components";

const JobCard = styled.div`
 width: 600px;
 margin: 18px auto;
 padding: 24px;
 border: 1px solid #e5e7eb;
 border-radius: 16px;
 background: #ffffff;
 box-shadow: 0 2px 8px rgba(15, 23, 42, 0.04);
 transition: all 0.2s ease;

 &:hover {
   border-color: #cbd5e1;
   box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
   transform: translateY(-2px);
 }
`;

const JobTitle = styled.h2`
 margin: 0 0 18px;
 font-size: 19px;
 font-weight: 650;
 line-height: 1.45;
 letter-spacing: -0.2px;
 color: #0f172a;
`;

const JobInfo = styled.p`
 display: inline-flex;
 align-items: center;
 margin: 0 8px 0 0;
 padding: 6px 10px;
 border-radius: 6px;
 background: #f1f5f9;
 color: #475569;
 font-size: 13px;
 font-weight: 500;
`;

const JobLink = styled.a`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 margin-top: 20px;
 padding: 10px 16px;
 border-radius: 8px;
 background: #2563eb;
 color: #ffffff;
 font-size: 14px;
 font-weight: 600;
 text-decoration: none;
 transition: all 0.2s ease;

 &:hover {
   background: #1d4ed8;
   box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
 }

 &:active {
   transform: scale(0.98);
 }
`;

const LoadMoreButton = styled.button`
 display: block;
 margin: 32px auto 50px;
 padding: 12px 26px;
 border: 1px solid #dbe3ef;
 border-radius: 10px;
 background: #ffffff;
 color: #0f172a;
 font-size: 14px;
 font-weight: 600;
 cursor: pointer;
 box-shadow: 0 2px 6px rgba(15, 23, 42, 0.05);
 transition: all 0.2s ease;

 &:hover {
   background: #f8fafc;
   border-color: #94a3b8;
   box-shadow: 0 5px 14px rgba(15, 23, 42, 0.08);
   transform: translateY(-1px);
 }

 &:active {
   transform: translateY(0);
 }
`;

const Spinner = styled.div`
    width: 30px;
    height: 30px;
    margin: 40px auto;
    border: 3px solid #ddd;
    border-top: 3px solid #2563eb;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const JobPortal = () => {
    const [data, setData] = useState([]);
    const [ids, setIds] = useState([]);
    const [showData, setShowData] = useState(6);
    const [isLoading, setLoading] = useState(false);
    useEffect(() => {
        const fetchApi = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
                const data = await response.json();
                setIds(data);
                const throttling = data.slice(0, 6);
                const result = await Promise.all(
                    throttling.map((id) => {
                        return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                    })
                )
                const fullResponse = await Promise.all(
                    result.map((res) => res.json())
                );
                setData(fullResponse.slice(0, 6))
            } catch (error) {
                console.log(error)
                setLoading(false)
            } finally {
                setLoading(false);
            }
        }
        fetchApi();
    }, [])

    console.log(showData)

    if (isLoading) {
        return <Spinner />
    }

    const loadMoreHandler = async () => {
        // debugger
        if (ids) {
            const nextId = ids.slice(data.length, data.length + 6);
            const response = await Promise.all(
                nextId.map((id) => {
                    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
                })
            )
            const fullResponse = await Promise.all(
                response.map((res) => res.json())
            );
            setData((prev) => [...prev, ...fullResponse])
            console.log("fullResponse", fullResponse)
            setShowData((prev) => prev + 6)
        }
    }
    return (

        <>

            {data?.slice(0, showData).map((d) => {
                const dates = new Date(d.time);
                return (
                    <JobCard key={d.id}>
                        <JobTitle>
                            {d.title}
                        </JobTitle>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '20px'
                        }}>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}>

                                <JobInfo>
                                    Score: {d.score}
                                </JobInfo>

                                <JobInfo>
                                    {dates.toLocaleString()}
                                </JobInfo>

                            </div>
                            <JobLink
                                href={d.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Job →
                            </JobLink>

                        </div>

                    </JobCard>

                )

            })}

            <LoadMoreButton
                onClick={loadMoreHandler}
            >
                Load More Jobs
            </LoadMoreButton>

        </>


    )
}

export default JobPortal;