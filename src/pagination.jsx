import styled from "styled-components"

// Container to align pagination buttons horizontally
const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 8px;
    margin: 30px auto;
`

const Button = styled.button`
    padding: 8px 12px;
    background: ${props => props.$active ? '#00baff' : '#fff'};
    color: ${props => props.$active ? '#fff' : '#333'};
    outline: none;
    border: 1px solid #00baff;
    border-radius: 2px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
        color: #fff;
        background: #00baff;
    }

    &:disabled {
        border-color: #ccc;
        background: #f3f3f3;
        color: #999;
        cursor: not-allowed;
    }
`

const Pagination = ({ offSet, limit, totalPage, onPageChange }) => {
    // 1. Calculate pagination bounds using your API parameters
    const currentPage = Math.floor(offSet / limit) + 1;
    const totalPages = Math.ceil(totalPage / limit);

    // 2. Do not render anything if there is only 1 page or no data
    if (totalPages <= 1) return null;

    // 3. Create an array of page numbers [1, 2, 3, ... totalPages]
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1).slice(1,-1);

    return (
        <PaginationContainer>
            {/* Prev Button */}
            <Button 
                disabled={currentPage === 1} 
                onClick={() => onPageChange((currentPage - 2) * limit)}
            >
                &larr; Prev
            </Button>

            {/* Individual Page Number Buttons */}
            {pageNumbers.map((page) => {
                const isPageActive = currentPage === page;
                return (
                    <Button 
                        key={page}
                        $active={isPageActive}
                        onClick={() => onPageChange((page - 1) * limit)}
                    >
                        {page}
                    </Button>
                );
            })}

            {/* Next Button */}
            <Button 
                disabled={currentPage === totalPages} 
                onClick={() => onPageChange(currentPage * limit)}
            >
                Next &rarr;
            </Button>
        </PaginationContainer>
    )
}

export default Pagination
