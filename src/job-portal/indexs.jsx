import { useEffect, useState } from "react";
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
    const [id, setId] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showData, setShowData] = useState(6);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('https://hacker-news.firebaseio.com/v0/jobstories.json');
                const fullResponse = await response.json();
                setId(fullResponse);
                const throttling = fullResponse.splice(0, 6);
                const result = await Promise.all(
                    throttling.map((id) => {
                        return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                    })
                )
                const fullData = await Promise.all(
                    result.map((data) => data.json())
                )
                setData(fullData.slice(0, 6));
                setIsLoading(false)
            } catch (err) {
                console.log(err)
                setIsLoading(false)
                setError(true)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData();
    }, [])
    console.log(data)

    const loadMoreHandler = async () => {
        if (id) {
            const ids = id.slice(data.length, data.length + 6);
            const result = await Promise.all(
                ids.map((id) => {
                    return fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
                })
            )
            const fullData = await Promise.all(
                result.map((data) => data.json())
            )
            setData((prev) => [...prev, ...fullData]);
            setShowData((prev) => prev + 6)
        }
    }

    if (isLoading) {
        return <Spinner />
    }
    { error && <p>error</p> }
    return (
        <>
            {data.slice(0, showData).map((data) => {
                const date = new Date(data.time).toLocaleString();
                return (
                    <JobCard>
                        <JobTitle>{data.title}</JobTitle>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                gap: "20px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <JobInfo>Score: {data.score} </JobInfo>
                                <JobInfo>{date}</JobInfo>
                            </div>

                            <JobLink
                                href="https://example.com"
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Job →
                            </JobLink>
                        </div>
                    </JobCard>
                )
            })}

            <LoadMoreButton onClick={loadMoreHandler}>
                Load More Jobs
            </LoadMoreButton>
        </>
    );
};

export default JobPortal;