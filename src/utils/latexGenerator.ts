import { Resume } from "@/types";

const escapeLatex = (text: string | null | undefined): string => {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/({|}|%|&|\$|#|_)/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}")
    .replace(/</g, "\\textless{}")
    .replace(/>/g, "\\textgreater{}");
};

const processText = (html: string | null | undefined): string => {
  if (!html) return "";
  if (typeof document === "undefined") {
    // Fallback for SSR: basic text stripping
    return escapeLatex(html.replace(/<[^>]*>/g, " "));
  }

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;

  const walk = (node: Node): string => {
    if (node.nodeType === Node.TEXT_NODE) {
      return escapeLatex(node.textContent || "");
    }
    if (node.nodeType === Node.ELEMENT_NODE) {
      const el = node as Element;
      const tagName = el.tagName.toLowerCase();
      let content = "";

      el.childNodes.forEach(child => {
        content += walk(child);
      });

      switch (tagName) {
        case "strong":
        case "b":
          return `\\textbf{${content}}`;
        case "em":
        case "i":
          return `\\textit{${content}}`;
        case "u":
          return `\\underline{${content}}`;
        case "ul":
          return `\\begin{itemize}\n${content}\\end{itemize}\n`;
        case "ol":
          // Fallback to itemize for ordered lists to avoid latex numbering issues
          return `\\begin{itemize}\n${content}\\end{itemize}\n`;
        case "li":
          return `\\item ${content}\n`;
        case "br":
          return `\\\\`;
        case "p":
        case "div":
          if (!content.trim()) return "";
          return `${content}\\par\n`;
        case "h1":
        case "h2":
        case "h3":
        case "h4":
        case "h5":
        case "h6":
          return `\\textbf{${content}}\\par\n`;
        case "blockquote":
          return `${content}\\par\n`;
        case "a":
          const href = el.getAttribute("href");
          if (href) return `\\href{${href}}{${content}}`;
          return content;
        default:
          return content;
      }
    }
    return "";
  };

  return walk(tempDiv).trim();
};

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return escapeLatex(dateString); // Return as is if not a valid date
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short" });
};

const PREAMBLE = `
\\documentclass{article}
\\usepackage[left=0.4in,top=0.4in,right=0.4in,bottom=0.4in]{geometry}
\\usepackage{hyperref}
\\usepackage{enumitem}
\\usepackage{tabularx}

\\pagestyle{empty}

\\newcommand{\\name}[1]{\\centerline{\\Huge\\bfseries #1}}
\\newcommand{\\address}[1]{\\centerline{#1}}
\\newcommand{\\tab}[1]{\\hspace{.2667\\textwidth}\\rlap{#1}}
\\newcommand{\\itab}[1]{\\hspace{0em}\\rlap{#1}}

% Hyperlink configuration
\\hypersetup{
    colorlinks=true,
    linkcolor=black,
    filecolor=magenta,      
    urlcolor=blue,
}

% Section formatting
\\newenvironment{rSection}[1]{
  \\noindent{\\bfseries\\MakeUppercase{#1}}
  \\par
  \\vspace{0.7em} %% Spacing ABOVE the line divider
  \\hrule
  \\vspace{0.7em} %% Spacing BELOW the line divider (and above content)
  \\begin{list}{}{
    \\setlength{\\leftmargin}{0em}
    \\setlength{\\topsep}{0em}
    \\setlength{\\partopsep}{0em}
    \\setlength{\\parsep}{0.2em}
    \\setlength{\\itemsep}{0.2em}
  }
  \\item[]
}{
  \\end{list}
  \\vspace{1.5em} %% Spacing BELOW content (Bottom Sep)
}
`;

const generatePersonalInfo = (resume: Resume): string => {
  const { personalInfo } = resume.content as { personalInfo: any };
  const name = escapeLatex(
    `${personalInfo.firstName} ${personalInfo.lastName}`
  ).toUpperCase();
  const phone = escapeLatex(personalInfo.phone);
  const email = escapeLatex(personalInfo.email);
  const location = escapeLatex(`${personalInfo.city}, ${personalInfo.country}`);
  const linkedin = personalInfo.linkedinUrl
    ? `\\href{${personalInfo.linkedinUrl}}{LinkedIn}`
    : "";
  const portfolio = personalInfo.portfolio
    ? `\\href{${personalInfo.portfolio}}{Portfolio}`
    : "";

  // Center alignment for header
  // Name
  // Phone <> Location
  // Email <> LinkedIn <> Portfolio

  let header = `\\centerline{\\Huge\\bfseries ${name}} \\medskip\n`;

  const line2: string[] = [];
  if (phone) line2.push(phone);
  if (location) line2.push(location);

  if (line2.length > 0) {
    header += `\\centerline{${line2.join(" $\\diamond$ ")}} \\medskip\n`;
  }

  const line3: string[] = [];
  if (email) line3.push(`\\href{mailto:${personalInfo.email}}{${email}}`);
  if (linkedin) line3.push(linkedin);
  if (portfolio) line3.push(portfolio);
  // Add other links if present in a generic way? For now specific.

  if (line3.length > 0) {
    header += `\\centerline{${line3.join(" $\\diamond$ ")}} \\bigskip\n`;
  } else {
    header += `\\bigskip\n`;
  }

  return header;
};

const generateSectionContent = (sectionId: string, resume: Resume): string => {
  const { content } = resume;

  switch (sectionId) {
    case "summary":
      if (!content.personalInfo.summary) return "";
      return `
\\begin{rSection}{Summary}
${processText(content.personalInfo.summary)}
\\end{rSection}
`;

    case "education":
      if (!content.education || content.education.length === 0) return "";
      return `
\\begin{rSection}{Education}
${content.education
  .map(
    edu => `
{\\bf ${escapeLatex(edu.degree)} in ${escapeLatex(edu.fieldOfStudy)}}, ${escapeLatex(edu.institution)} \\hfill {${formatDate(edu.startDate)} -- ${edu.current ? "Present" : formatDate(edu.endDate)}} \\\\
${edu.location ? `${escapeLatex(edu.location)}` : ""}
`
  )
  .join("\n")}
\\end{rSection}
`;

    case "experience":
      if (!content.experience || content.experience.length === 0) return "";
      return `
\\begin{rSection}{Experience}
${content.experience
  .map(
    exp => `
\\textbf{${escapeLatex(exp.position)}} \\hfill ${formatDate(exp.startDate)} -- ${exp.current ? "Present" : formatDate(exp.endDate)} \\\\
${escapeLatex(exp.company)} \\hfill \\textit{${escapeLatex(exp.location)}} \\\\
${exp.description ? processText(exp.description) : ""}
`
  )
  .join("\n")}
\\end{rSection}
`;

    case "skills":
      if (!content.skills || content.skills.length === 0) return "";

      return `
\\begin{rSection}{Skills}
\\begin{tabular}{ @{} >{\\bfseries}l @{\\hspace{6ex}} l }
Skills & ${content.skills.map(s => escapeLatex(s.name)).join(", ")}
\\end{tabular}
\\end{rSection}
`;

    case "projects":
      if (!content.projects || content.projects.length === 0) return "";
      return `
\\begin{rSection}{Projects}
${content.projects
  .map(
    proj => `
\\item \\textbf{${escapeLatex(proj.title)}:} ${proj.link ? `\\href{${proj.link}}{${escapeLatex(proj.link)}}` : ""} -- ${processText(proj.description)}
${proj.technologies && proj.technologies.length > 0 ? `\\\\ \\textbf{Stack:} ${escapeLatex(proj.technologies.join(", "))}` : ""}
`
  )
  .join("\n")}
\\end{rSection}
`;

    case "certifications":
      if (!content.certifications || content.certifications.length === 0)
        return "";
      return `
\\begin{rSection}{Certifications}
\\begin{itemize}
${content.certifications
  .map(
    cert => `
    \\item \\textbf{${escapeLatex(cert.name)}}, ${escapeLatex(cert.issuingOrganization)} (${formatDate(cert.issueDate)})
`
  )
  .join("")}
\\end{itemize}
\\end{rSection}
`;

    case "courses":
      if (!content.courses || content.courses.length === 0) return "";
      return `
\\begin{rSection}{Courses}
\\begin{itemize}
${content.courses
  .map(
    course => `
    \\item \\textbf{${escapeLatex(course.name)}}, ${escapeLatex(course.institution)} (${formatDate(course.completionDate)})
`
  )
  .join("")}
\\end{itemize}
\\end{rSection}
`;

    case "internships":
      if (!content.internships || content.internships.length === 0) return "";
      return `
\\begin{rSection}{Internships}
${content.internships
  .map(
    int => `
\\textbf{${escapeLatex(int.position)}} \\hfill ${formatDate(int.startDate)} -- ${int.current ? "Present" : formatDate(int.endDate)} \\\\
${escapeLatex(int.company)} \\hfill \\textit{${escapeLatex(int.location)}} \\\\
${int.description ? processText(int.description) : ""}
`
  )
  .join("\n")}
\\end{rSection}
`;

    case "hobbies":
      if (!content.hobbies || content.hobbies.length === 0) return "";
      return `
\\begin{rSection}{Hobbies}
\\begin{itemize}
${content.hobbies
  .map(
    hobby => `
    \\item \\textbf{${escapeLatex(hobby.name)}}: ${processText(hobby.description)}
`
  )
  .join("")}
\\end{itemize}
\\end{rSection}
`;

    case "languages":
      if (!content.languages || content.languages.length === 0) return "";
      return `
\\begin{rSection}{Languages}
\\begin{itemize}
${content.languages
  .map(
    lang => `
    \\item \\textbf{${escapeLatex(lang.name)}} (${escapeLatex(lang.proficiency)})
`
  )
  .join("")}
\\end{itemize}
\\end{rSection}
`;

    case "references":
      if (!content.references || content.references.length === 0) return "";
      return `
\\begin{rSection}{References}
\\begin{itemize}
${content.references
  .map(
    ref => `
    \\item \\textbf{${escapeLatex(ref.name)}}, ${escapeLatex(ref.position)} at ${escapeLatex(ref.company)} -- Email: ${escapeLatex(ref.email)} | Phone: ${escapeLatex(ref.phone)}
`
  )
  .join("")}
\\end{itemize}
\\end{rSection}
`;

    default:
      return "";
  }
};

export const generateLatex = (
  resume: Resume,
  sectionOrder: string[]
): string => {
  let latexContent = PREAMBLE;

  latexContent += "\\begin{document}\n";

  latexContent += generatePersonalInfo(resume);

  const processedSections = new Set<string>();

  sectionOrder.forEach(sectionId => {
    if (sectionId === "personal") return;
    if (sectionId === "additional") return;
    if (processedSections.has(sectionId)) return;

    latexContent += generateSectionContent(sectionId, resume);
    processedSections.add(sectionId);
  });

  latexContent += "\n\\end{document}";

  return latexContent;
};
