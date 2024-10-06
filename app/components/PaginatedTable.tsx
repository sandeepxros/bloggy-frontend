import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface PaginatedTableProps {
  columns: { label: string; field: string; width?: string }[];
  data: any[];
  page: number;
  totalPages: number;
  pageSize: number;
  searchTerm: string;
  loading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onRead?: (row: any) => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({
  columns,
  data,
  page,
  totalPages,
  pageSize,
  searchTerm,
  loading,
  setPage,
  setPageSize,
  setSearchTerm,
  onRead,
  onEdit,
  onDelete,
}) => {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce search term for optimization
  useEffect(() => {
    const handler = setTimeout(() => setSearchTerm(debouncedSearchTerm), 500);
    return () => clearTimeout(handler);
  }, [debouncedSearchTerm, setSearchTerm]);

  // Memoize column rendering
  const renderedColumns = useMemo(
    () => (
      <>
        {columns.map((col) => (
          <Th key={col.field} width={col.width || "auto"}>
            {col.label}
          </Th>
        ))}
        {(onRead || onEdit || onDelete) && <Th>Actions</Th>}
      </>
    ),
    [columns, onRead, onEdit, onDelete]
  );

  // Render actions conditionally
  const renderActions = useCallback(
    (row: any) => (
      <>
        {onRead && (
          <Button
            variant="link"
            colorScheme="blackAlpha"
            onClick={() => onRead(row)}
            mr={2}
          >
            <FaEye />
          </Button>
        )}
        {onEdit && (
          <Button
            variant="link"
            colorScheme="blackAlpha"
            onClick={() => onEdit(row)}
            mr={2}
          >
            <FaEdit />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="link"
            colorScheme="blackAlpha"
            onClick={() => onDelete(row)}
          >
            <FaTrash />
          </Button>
        )}
      </>
    ),
    [onRead, onEdit, onDelete]
  );

  // Render data rows
  const renderedRows = useMemo(() => {
    if (loading) {
      return (
        <Tr>
          <Td colSpan={columns.length + 1} textAlign="center">
            <Spinner size="lg" />
          </Td>
        </Tr>
      );
    }

    if (data.length === 0) {
      return (
        <Tr>
          <Td colSpan={columns.length + 1} textAlign="center">
            No data found.
          </Td>
        </Tr>
      );
    }

    return data.map((row, index) => (
      <Tr key={index} _hover={{ bg: "gray.100" }}>
        {columns.map((col) => (
          <Td
            key={col.field}
            maxW={col.width || "200px"}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {row[col.field]}
          </Td>
        ))}
        {(onRead || onEdit || onDelete) && <Td>{renderActions(row)}</Td>}
      </Tr>
    ));
  }, [loading, data, columns, renderActions]);

  return (
    <Box p={6} borderWidth={1} borderRadius="lg" shadow="md" bg="white">
      <Flex mb={4} alignItems="center">
        <Input
          placeholder="Search..."
          value={debouncedSearchTerm}
          onChange={(e) => setDebouncedSearchTerm(e.target.value)}
          mr={4}
        />
        <Select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPage(1); // Reset to first page on page size change
          }}
          width="150px"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </Select>
      </Flex>
      <TableContainer>
        <Table variant="simple">
          <TableCaption fontSize="lg" fontWeight="bold">
            Data List
          </TableCaption>
          <Thead>
            <Tr>{renderedColumns}</Tr>
          </Thead>
          <Tbody>{renderedRows}</Tbody>
        </Table>
      </TableContainer>
      <Flex mt={4} justifyContent="space-between" alignItems="center">
        <Box>
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            isDisabled={page === 1}
            variant="outline"
            colorScheme="teal"
            mr={2}
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            isDisabled={page === totalPages}
            variant="outline"
            colorScheme="teal"
          >
            Next
          </Button>
        </Box>
        <Box>
          Page {page} of {totalPages}
        </Box>
        <Box>
          <Button
            variant="link"
            colorScheme="teal"
            onClick={() => setPage(1)}
            isDisabled={page === 1}
          >
            First Page
          </Button>
          <Button
            variant="link"
            colorScheme="teal"
            onClick={() => setPage(totalPages)}
            isDisabled={page === totalPages}
          >
            Last Page
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default PaginatedTable;
