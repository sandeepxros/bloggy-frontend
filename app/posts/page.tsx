// pages/BlogsTable.tsx
"use client";
import {
    Box,
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    HStack,
    IconButton,
    Image,
    Stack,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import PaginatedTable from "../components/PaginatedTable";

const BlogsTable: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api-dev.hubeco.market/blog/getAllBlogs?page=${page}&limit=${pageSize}&searchTerm=${searchTerm}`
        );
        const jsonResponse = await response.json();
        setData(jsonResponse.data);
        setTotalPages(jsonResponse.metadata.totalPages);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page, pageSize, searchTerm]);

  const columns = [
    { label: "ID", field: "_id", width: "200px" },
    { label: "Title", field: "title", width: "200px" },
    { label: "Author", field: "author.firstName" },
    { label: "Status", field: "status" },
    { label: "Active", field: "isActive", width: "80px" },
  ];

  const handleRead = (blog: any) => {
    setSelectedBlog(blog);
    onOpen();
  };

  const renderBlogDetails = () => {
    if (!selectedBlog) {
      return <Text>No blog selected</Text>;
    }

    return (
      <Stack spacing={5}>
        {selectedBlog.thumbnail && (
          <Image
            src={selectedBlog.thumbnail}
            alt={selectedBlog.title}
            borderRadius="md"
            boxSize="300px"
            objectFit="cover"
            mb={4}
          />
        )}
        <DetailItem label="Title" value={selectedBlog.title} />
        <DetailItem label="Author" value={`${selectedBlog.author?.firstName} ${selectedBlog.author?.lastName}`} />
        <DetailItem label="Status" value={selectedBlog.status} />
        <Divider />
        <Box>
          <Text fontWeight="bold">Content:</Text>
          <Box
            mt={3}
            borderWidth="1px"
            borderRadius="md"
            padding={4}
            backgroundColor="gray.50"
            dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
          />
        </Box>
      </Stack>
    );
  };

  return (
    <>
      <PaginatedTable
        columns={columns}
        data={data}
        page={page}
        totalPages={totalPages}
        pageSize={pageSize}
        searchTerm={searchTerm}
        loading={loading}
        setPage={setPage}
        setPageSize={setPageSize}
        setSearchTerm={setSearchTerm}
        onRead={handleRead}
        onEdit={() => {}}
        onDelete={() => {}}
      />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="xl">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <HStack spacing={3}>
              <IconButton
                icon={<BiArrowBack />}
                onClick={onClose}
                variant="ghost"
                aria-label="Back"
              />
              <Heading as="h3" size="lg">Blog Details</Heading>
            </HStack>
          </DrawerHeader>

          <DrawerBody>
            {renderBlogDetails()}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

// Helper Component for displaying blog details
const DetailItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <Box>
    <Text fontWeight="bold">{label}:</Text>
    <Text>{value}</Text>
    <Divider />
  </Box>
);

export default BlogsTable;
