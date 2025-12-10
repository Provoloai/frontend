import React from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { useParams } from "@tanstack/react-router";
import { blogPosts } from "@/data";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const BlogPostSingle: React.FC = () => {
  const { blogpostId } = useParams({
    from: "/blogPost/$blogpostId",
  });

  console.log(blogpostId);

  const blogPost = blogPosts.find(post => post.id.toString() === blogpostId);
  return (
    <>
      <Header />
      <div className="min-h-screen bg- px-6 py-16 sm:pt-48 space-y-6">

        {/* Back Button */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
          <motion.button
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm "
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to blog</span>
          </motion.button>
        </div>

        {/* Article Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>

            {/* Title */}
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-5">
              {blogPost?.title}
            </h1>

            {/* Excerpt */}
            <p className="text-gray-600 mb-5 leading-relaxed">
              {blogPost?.excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 mb-8  text-xs">
              <div className="flex items-center gap-2 text-gray-600 text-xs">
                <Calendar className="w-3 h-3" />
                <span>{blogPost?.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="w-3 h-3" />
                <span>{blogPost?.readTime}</span>
              </div>
            </div>

          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="mb-12"
          >
            <div className="relative h-96 sm:h-[500px] rounded-2xl overflow-hidden">
              <img
                src={blogPost?.image}
                alt={blogPost?.title}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="prose prose-lg max-w-none mb-12 border-b border-gray-200"
          >
            {blogPost?.content.map((paragraph, index) => (
              <p
                key={index}
                className="text-gray-700 leading-relaxed mb-6 text-justify"
              >
                {paragraph}
              </p>
            ))}
          </motion.div>

        </article>
      </div>
      <Footer />
    </>
  );
};

export default BlogPostSingle;
