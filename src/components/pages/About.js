import React from "react";
import ProjectFeatureCheckList from "../ProjectFeatureCheckList";

export default function about() {
  document.title = "Text Analyzer - About";

  return (
    <section className="text-gray-600 container py-10 md:py-14">
      <div className="text-center pb-5">
        <h1 className="sm:text-4xl text-2xl font-medium text-center title-font text-blue-500">
          About Project
        </h1>
        <p className="text-xs md:text-sm text-gray-400 py-2">Everything is free 👍🏻</p>
      </div>

      <div className="flex flex-wrap lg:w-4/5 text-sm md:text-base sm:mx-auto sm:mb-2 -mx-2">
        <ProjectFeatureCheckList text="Convert text to title case" />
        <ProjectFeatureCheckList text="Convert lowercase to uppercase" />
        <ProjectFeatureCheckList text="Convert uppercase to lowercase" />
        <ProjectFeatureCheckList text="Convert text to sentence case" />
        <ProjectFeatureCheckList text="Remove extra whitespace" />
        <ProjectFeatureCheckList text="Reverse the text" />
        <ProjectFeatureCheckList text="Copy to clipboard" />
        <ProjectFeatureCheckList text="Count words and characters" />
        <ProjectFeatureCheckList text="Count number of sentences" />
        <ProjectFeatureCheckList text="Count number of vowels" />
        <ProjectFeatureCheckList text="Count number of consonants" />
        <ProjectFeatureCheckList text="Estimate reading time" />
        <ProjectFeatureCheckList text="Generate basic summary from content" />
      </div>
    </section>
  );
}
