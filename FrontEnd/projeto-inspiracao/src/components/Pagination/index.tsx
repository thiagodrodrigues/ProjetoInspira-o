import { getPaginationItems } from '../../lib/pagination';
import './Paginas.css';
import PaginaLink from './PageLink'

type Props = {
  currentPage: number;
  lastPage: number;
  maxLength: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  lastPage,
  maxLength,
  setCurrentPage,
}: Props) {
  const pageNums = getPaginationItems(currentPage, lastPage, maxLength);

  return (
    <nav className="pagination" aria-label="Pagination">
      <PaginaLink
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Anterior
      </PaginaLink>
      {pageNums.map((pageNum, idx) => (
        <PaginaLink
          key={idx}
          active={currentPage === pageNum}
          disabled={isNaN(pageNum)}
          onClick={() => setCurrentPage(pageNum)}
        >
          {!isNaN(pageNum) ? pageNum : '...'}
        </PaginaLink>
      ))}
      <PaginaLink
        disabled={currentPage === lastPage}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Próximo
      </PaginaLink>
    </nav>
  );
}