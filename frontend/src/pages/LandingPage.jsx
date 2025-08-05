import React from "react";
import { ArrowDown, BarChart3 } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { Features } from "../components/Features";

function LandingPage() {
  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-4 sm:px-6 md:px-12 lg:px-24 xl:px-48">
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-chart-3 to-chart-2 bg-clip-text text-transparent text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        GraphCraft
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="space-grotesk max-w-xl text-center text-base sm:text-lg md:text-xl font-light mb-6"
      >
        <p>
          Transform your spreadsheets into stunning visualizations and seamlessly convert between file formats with professional-grade precision.
        </p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 mt-5">
        <motion.button
          whileHover={{ scale: 1.07, filter: "brightness(1.07)" }}
          whileTap={{ scale: 0.97 }}
          className="gap-2 text-lg px-4 py-2 bg-gradient-to-br from-chart-6 to-chart-5 hover:from-chart-5 hover:to-chart-6 transition-all duration-300 shadow-lg backdrop-blur-sm cursor-pointer flex items-center rounded-md font-medium justify-center"
          onClick={scrollToFeatures}
        >
          <BarChart3 className="mr-2 h-5 w-5" />
          Explore Features
        </motion.button>

        <SignedOut>
          <motion.div
            whileHover={{ scale: 1.07, filter: "brightness(1.07)" }}
            whileTap={{ scale: 0.97 }}
          >
            <SignUpButton>
              <span className="text-lg px-4 py-2 rounded-md text-black font-medium bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 transition-all duration-300 shadow-lg backdrop-blur-sm cursor-pointer w-full sm:w-auto text-center">
                Sign Up
              </span>
            </SignUpButton>
          </motion.div>
        </SignedOut>
      </div>

      <div className="flex flex-col md:flex-row justify-around gap-8 mt-10 w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl font-bold bg-gradient-to-r from-primary via-chart-6 to-chart-3 bg-clip-text text-transparent px-6 py-4 border-2 rounded-md border-border/100 text-center"
        >
          Multiple <br /> Charts
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="border-2 border-border/100 rounded-md py-4 px-6 text-center"
        >
          <h2 className="font-bold text-2xl bg-gradient-to-r from-primary via-chart-4 to-chart-5 bg-clip-text text-transparent">
            100%
          </h2>
          <div className="font-light">Secure Processing</div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-2 border-border/100 rounded-md py-4 px-6 text-center"
        >
          <h1 className="font-bold text-2xl bg-gradient-to-r from-primary via-chart-2 to-chart-5 bg-clip-text text-transparent shadows-into-light-regular">
            1-Click
          </h1>
          <div className="font-light">Download</div>
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="cursor-pointer mt-8"
        onClick={scrollToFeatures}
      >
        <ArrowDown className="h-8 w-8 text-muted-foreground hover:text-primary transition-colors mx-auto" />
      </motion.div>

      <Features />
    </div>
  );
}

export default LandingPage;