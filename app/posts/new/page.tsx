"use client";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Select,
  Tag,
  TagCloseButton,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";

const AddBlog: React.FC = () => {
  const toast = useToast();

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    content: Yup.string().required("Content is required"),
    tags: Yup.array().of(Yup.string()).min(1, "At least one tag is required"),
    category: Yup.string().required("Category is required"),
    subcategory: Yup.string().required("Subcategory is required"),
    thumbnail: Yup.mixed().required("Thumbnail is required"),
    metaTags: Yup.array()
      .of(Yup.string())
      .min(1, "At least one meta tag is required"),
    metaDescription: Yup.string().required("meta description is required"),
  });

  const initialValues = {
    title: "",
    content: "",
    tags: [],
    category: "",
    subcategory: "",
    thumbnail: null,
    metaTags: [],
    metaDescription: "",
  };

  const handleSubmit = (values: any) => {
    console.log("Blog data submitted:", values);
    toast({
      title: "Blog created.",
      description: "Your blog post has been created successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Box
      maxW="1200px"
      mx="auto"
      p={6}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      mt={7}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
          <Form>
            <VStack spacing={4} align="stretch">
              <Field name="title">
                {({ field }) => (
                  <FormControl isInvalid={!!(errors.title && touched.title)}>
                    <FormLabel htmlFor="title">Blog Title</FormLabel>
                    <Input
                      {...field}
                      id="title"
                      placeholder="Enter blog title"
                      bg="white"
                      borderColor={"gray.300"}
                      _hover={{ borderColor: "gray.500" }}
                      _focus={{
                        borderColor: "teal.500",
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                    />
                    <FormErrorMessage>
                      {errors.title && touched.title && errors.title}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="content">
                {() => (
                  <FormControl
                    isInvalid={!!(errors.content && touched.content)}
                  >
                    <FormLabel htmlFor="content">Content</FormLabel>
                    <ReactQuill
                      value={values.content}
                      onChange={(value) => setFieldValue("content", value)}
                      theme="snow"
                      placeholder="Write your blog content here..."
                      className={`h-[400px] rounded-md mb-12 ${
                        errors.content && touched.content && "ql-error"
                      }`}
                    />
                    <FormErrorMessage>
                      {errors.content && touched.content && errors.content}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <FieldArray name="tags">
                {({ push, remove }) => (
                  <FormControl isInvalid={!!(errors.tags && touched.tags)}>
                    <FormLabel htmlFor="tags">Tags</FormLabel>
                    <Input
                      placeholder="Add a tag and press space"
                      onKeyDown={(e) => {
                        if (e.key === " ") {
                          e.preventDefault();
                          const tag = e.currentTarget.value.trim();
                          if (tag) {
                            push(tag);
                            e.currentTarget.value = "";
                          }
                        }
                      }}
                      bg="white"
                      borderColor="gray.300"
                      _hover={{ borderColor: "gray.500" }}
                      _focus={{
                        borderColor: "teal.500",
                        boxShadow: "0 0 0 1px teal.500",
                      }}
                    />
                    <FormErrorMessage>
                      {errors.tags && touched.tags && errors.tags}
                    </FormErrorMessage>

                    <HStack spacing={2} mt={2}>
                      {values.tags.map((tag, index) => (
                        <Tag
                          size="md"
                          key={index}
                          variant="solid"
                          colorScheme="teal"
                        >
                          {tag}
                          <TagCloseButton onClick={() => remove(index)} />
                        </Tag>
                      ))}
                    </HStack>
                  </FormControl>
                )}
              </FieldArray>

              <HStack spacing={4}>
                <FormControl
                  isInvalid={!!(errors.category && touched.category)}
                >
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <Field as={Select} name="category" id="category">
                    <option value="">Select category</option>
                    <option value="tech">Tech</option>
                    <option value="lifestyle">Lifestyle</option>
                    <option value="education">Education</option>
                  </Field>
                  {
                    <FormErrorMessage>
                      {errors.category && touched.category && errors.category}
                    </FormErrorMessage>
                  }
                </FormControl>

                <FormControl
                  isInvalid={!!(errors.subcategory && touched.subcategory)}
                >
                  <FormLabel htmlFor="subcategory">Subcategory</FormLabel>
                  <Field as={Select} name="subcategory" id="subcategory">
                    <option value="">Select subcategory</option>
                    <option value="web-development">Web Development</option>
                    <option value="app-development">App Development</option>
                    <option value="personal-development">
                      Personal Development
                    </option>
                  </Field>
                  {
                    <FormErrorMessage>
                      {errors.subcategory &&
                        touched.subcategory &&
                        errors.subcategory}
                    </FormErrorMessage>
                  }
                </FormControl>
              </HStack>

              <FormControl
                isInvalid={!!(errors.thumbnail && touched.thumbnail)}
              >
                <FormLabel htmlFor="thumbnail">Thumbnail Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setFieldValue("thumbnail", file);
                    }
                  }}
                  bg="white"
                  borderColor="gray.300"
                  _hover={{ borderColor: "gray.500" }}
                  _focus={{
                    borderColor: "teal.500",
                    boxShadow: "0 0 0 1px teal.500",
                  }}
                />

                <FormErrorMessage className="text-red-500">
                  {errors.thumbnail && touched.thumbnail && errors.thumbnail}
                </FormErrorMessage>
              </FormControl>

              <VStack>
                <FormControl
                  isInvalid={!!(errors.metaTags && touched.metaTags)}
                >
                  <FormLabel htmlFor="metaTags">Meta Tags</FormLabel>
                  <FieldArray name="metaTags">
                    {({ push, remove }) => (
                      <>
                        <Input
                          placeholder="Add a tag and press space"
                          onKeyDown={(e) => {
                            if (e.key === " ") {
                              e.preventDefault();
                              const tag = e.currentTarget.value.trim();
                              if (tag) {
                                push(tag);
                                e.currentTarget.value = "";
                              }
                            }
                          }}
                          bg="white"
                          borderColor="gray.300"
                          _hover={{ borderColor: "gray.500" }}
                          _focus={{
                            borderColor: "teal.500",
                            boxShadow: "0 0 0 1px teal.500",
                          }}
                        />
                        <FormErrorMessage>
                          {errors.metaTags &&
                            touched.metaTags &&
                            errors.metaTags}
                        </FormErrorMessage>
                        <HStack spacing={2} mt={2}>
                          {values.metaTags.map((tag, index) => (
                            <Tag
                              size="md"
                              key={index}
                              variant="solid"
                              colorScheme="teal"
                            >
                              {tag}
                              <TagCloseButton onClick={() => remove(index)} />
                            </Tag>
                          ))}
                        </HStack>
                      </>
                    )}
                  </FieldArray>
                </FormControl>

                <Field name="metaDescription">
                  {({ field }) => (
                    <FormControl
                      isInvalid={
                        !!(errors.metaDescription && touched.metaDescription)
                      }
                    >
                      <FormLabel htmlFor="metaDescription">
                        Meta Description{" "}
                      </FormLabel>
                      <Input
                        {...field}
                        id="metaDescription"
                        placeholder="Enter meta description"
                        bg="white"
                        borderColor={"gray.300"}
                        _hover={{ borderColor: "gray.500" }}
                        _focus={{
                          borderColor: "teal.500",
                          boxShadow: "0 0 0 1px teal.500",
                        }}
                      />
                      <FormErrorMessage>
                        {errors.metaDescription &&
                          touched.metaDescription &&
                          errors.metaDescription}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </VStack>

              <HStack>
                <Button type="submit" colorScheme="teal" mt={6} size={"sm"}>
                  Create Blog
                </Button>
                <Button type="reset" colorScheme="red" mt={6} size={"sm"}>
                  Reset
                </Button>
              </HStack>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AddBlog;
