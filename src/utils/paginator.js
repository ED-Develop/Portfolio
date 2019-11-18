export const calcStartPage = (startPage, totalPages, portionSize, currentPage) => {

    if (currentPage >= totalPages && totalPages != 0) {
        startPage = totalPages - portionSize;
    } else if (currentPage <= 1) {
        startPage = 1;
    } else if (currentPage == startPage + 3 && currentPage != totalPages - 1) {
        startPage = startPage + 1;
    } else if (currentPage == startPage + 4) {
        startPage = startPage + 2;
    } else if (currentPage == startPage + 1 && currentPage != 2) {
        startPage = startPage - 1;
    } else if (currentPage == startPage && currentPage != 1) {
        startPage = startPage - 2;
    }

    return startPage;
};