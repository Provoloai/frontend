import CustomButton from "@/Reusables/CustomButton";
import React from "react";
import DOMPurify from "dompurify";

interface ResumePreviewProps {
  formData: any;
  sectionOrder?: string[];
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ formData, sectionOrder = [] }) => {
  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const handleDownload = () => {
    alert("Download feature requires a PDF generation library. This is a demo placeholder.");
  };

  const renderRichText = (html: string) => {
    return (
      <div
        className="prose prose-sm max-w-none text-[13px] leading-relaxed text-gray-900 list-inside marker:text-gray-900"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
      />
    );
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case 'personal':
        return (
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold uppercase tracking-wide text-black">
              {formData.personalInfo?.firstName} {formData.personalInfo?.lastName}
            </h1>
            <div className="flex flex-col items-center mt-1 text-[13px] text-gray-900">
              <div className="flex gap-x-2">
                {formData.personalInfo?.phone && <span>{formData.personalInfo.phone}</span>}
                {formData.personalInfo?.phone && (formData.personalInfo?.city || formData.personalInfo?.country) && <span>\\</span>}
                {(formData.personalInfo?.city || formData.personalInfo?.country) && (
                  <span>
                    {formData.personalInfo.city}
                    {formData.personalInfo.city && formData.personalInfo.country && ", "}
                    {formData.personalInfo.country}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-0.5">
                {formData.personalInfo?.email && (
                  <a href={`mailto:${formData.personalInfo.email}`} className="underline">
                    {formData.personalInfo.email}
                  </a>
                )}
                {formData.personalInfo?.portfolio && (
                  <>
                    <span className="text-gray-400">|</span>
                    <a href={formData.personalInfo.portfolio} target="_blank" rel="noreferrer" className="underline">
                      Portfolio
                    </a>
                  </>
                )}
                {formData.personalInfo?.linkedin && (
                  <>
                    <span className="text-gray-400">|</span>
                    <a href={formData.personalInfo.linkedin} target="_blank" rel="noreferrer" className="underline">
                      LinkedIn
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        );

      case 'summary':
        if (!formData.summary) return null;
        return (
          <section className="mb-5">
            <div className="border-b border-gray-900 mb-2">
              <h2 className="font-bold uppercase text-[14px] tracking-tight text-black">
                Summary
              </h2>
            </div>
            {renderRichText(formData.summary)}
          </section>
        );

      case 'experience':
        if (!formData.experience?.length) return null;
        return (
          <section className="mb-5">
            <div className="border-b border-gray-900 mb-3">
              <h2 className="font-bold uppercase text-[14px] tracking-tight text-black">
                Experience
              </h2>
            </div>
            {formData.experience.map((exp: any) => (
              <div key={exp.id} className="mb-5 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-[13px] text-black">
                    {exp.jobTitle}
                  </p>
                  <span className="text-[12px] text-gray-900">
                    {formatDate(exp.startDate)} – {exp.currentlyWorking ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline mb-1">
                  <p className="font-bold text-[13px] text-black">
                    {exp.employer}
                    {(exp.city || exp.country) && (
                      <span className="font-normal italic">
                        {" "} — {exp.city}
                        {exp.city && exp.country && ", "}
                        {exp.country}
                      </span>
                    )}
                  </p>
                </div>
                {exp.description && (
                  <div className="mt-1">
                    {renderRichText(exp.description)}
                  </div>
                )}
              </div>
            ))}
          </section>
        );

      case 'education':
        if (!formData.education?.length) return null;
        return (
          <section className="mb-5">
            <div className="border-b border-gray-900 mb-3">
              <h2 className="font-bold uppercase text-[14px] tracking-tight text-black">
                Education
              </h2>
            </div>
            {formData.education.map((edu: any) => (
              <div key={edu.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-[13px] text-black">
                    {edu.degree}
                  </p>
                  <span className="text-[12px] text-gray-900">
                    {formatDate(edu.startDate)} – {edu.currentlyStudying ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-[13px] text-black italic">
                    {edu.school}
                    {(edu.city || edu.country) && (
                      <span className="not-italic">
                        {" "} — {edu.city}
                        {edu.city && edu.country && ", "}
                        {edu.country}
                      </span>
                    )}
                  </p>
                </div>
                {edu.description && (
                  <div className="mt-1">
                    {renderRichText(edu.description)}
                  </div>
                )}
              </div>
            ))}
          </section>
        );

      case 'skills':
        if (!formData.skills?.length) return null;

        // Group skills by category if visible in data, otherwise just a list
        // Form data usually has skills as a flat list, but let's try to group if possible or just show them nicely.
        // The LaTeX template uses categories. If we don't have categories, we'll just show them as a block.
        return (
          <section className="mb-5">
            <div className="border-b border-gray-900 mb-2">
              <h2 className="font-bold uppercase text-[14px] tracking-tight text-black">
                Skills
              </h2>
            </div>
            <div className="text-[13px] text-black">
              <table className="w-full">
                <tbody>
                  <tr className="align-top">
                    {/* Since our current schema might not have categories, we'll list them as one block 
                        or try to detect "type" if it exists. For now, following LaTeX style with bold label. */}
                    <td className="font-bold pt-1 w-[180px]">Technical Skills</td>
                    <td className="pt-1">
                      {formData.skills.map((skill: any) => skill.name).join(", ")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        );

      case 'courses':
        if (!formData.courses?.length) return null;
        return (
          <section className="mb-5">
            <div className="border-b border-gray-900 mb-2">
              <h2 className="font-bold uppercase text-[14px] tracking-tight text-black">
                Courses & Certifications
              </h2>
            </div>
            {formData.courses.map((course: any) => (
              <div key={course.id} className="mb-2 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-[13px] text-black">{course.name}</p>
                  {course.completionDate && (
                    <span className="text-[12px] text-gray-900">{formatDate(course.completionDate)}</span>
                  )}
                </div>
                <p className="text-[13px] text-black italic">{course.institution}</p>
                {course.description && (
                  <div className="mt-0.5">
                    {renderRichText(course.description)}
                  </div>
                )}
              </div>
            ))}
          </section>
        );

      case 'internships':
        if (!formData.internships?.length) return null;
        return (
          <section className="mb-5">
            <div className="border-b border-gray-900 mb-3">
              <h2 className="font-bold uppercase text-[14px] tracking-tight text-black">
                Internships
              </h2>
            </div>
            {formData.internships.map((internship: any) => (
              <div key={internship.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-[13px] text-black">{internship.position}</p>
                  <span className="text-[12px] text-gray-900">
                    {formatDate(internship.startDate)} – {formatDate(internship.endDate)}
                  </span>
                </div>
                <p className="text-[13px] text-black italic mb-1">{internship.company}</p>
                {internship.description && (
                  <div className="mt-1">
                    {renderRichText(internship.description)}
                  </div>
                )}
              </div>
            ))}
          </section>
        );

      case 'hobbies':
        if (!formData.hobbies?.length) return null;
        return (
          <section className="mb-5">
            <div className="border-b border-gray-900 mb-2">
              <h2 className="font-bold uppercase text-[14px] tracking-tight text-black">
                Hobbies & Interests
              </h2>
            </div>
            <div className="text-[13px] text-black">
              {formData.hobbies.map((hobby: any) => hobby.name).join(", ")}
            </div>
          </section>
        );

      case 'languages':
        if (!formData.languages?.length) return null;
        return (
          <section className="mb-5">
            <div className="border-b border-gray-900 mb-2">
              <h2 className="font-bold uppercase text-[14px] tracking-tight text-black">
                Languages
              </h2>
            </div>
            <div className="text-[13px] text-black">
              {formData.languages.map((lang: any) => `${lang.name} (${lang.proficiency})`).join(", ")}
            </div>
          </section>
        );

      case 'references':
        if (!formData.references?.length) return null;
        return (
          <section className="mb-5">
            <div className="border-b border-gray-900 mb-2">
              <h2 className="font-bold uppercase text-[14px] tracking-tight text-black">
                References
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {formData.references.map((reference: any) => (
                <div key={reference.id} className="text-[13px] text-black">
                  <p className="font-bold">{reference.name}</p>
                  <p className="italic">{reference.position} at {reference.company}</p>
                  <p>{reference.email} {reference.phone && `| ${reference.phone}`}</p>
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (!formData.projects?.length) return null;
        return (
          <section className="mb-5">
            <div className="border-b border-gray-900 mb-2">
              <h2 className="font-bold uppercase text-[14px] tracking-tight text-black">
                Projects
              </h2>
            </div>
            <ul className="list-disc list-inside space-y-1">
              {formData.projects.map((project: any) => (
                <li key={project.id} className="text-[13px] text-black">
                  <span className="font-bold">{project.title}:</span>{" "}
                  {project.description && <span>{project.description.replace(/<[^>]*>/g, '')}</span>}{" "}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noreferrer" className="underline ml-1">
                      Link
                    </a>
                  )}
                  {project.technologies?.length > 0 && (
                    <span className="ml-1 font-bold">Stack: {project.technologies.join(", ")}</span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        );

      case 'certifications':
        if (!formData.certifications?.length) return null;
        return (
          <section className="mb-5">
            <div className="border-b border-gray-900 mb-3">
              <h2 className="font-bold uppercase text-[14px] tracking-tight text-black">
                Certifications
              </h2>
            </div>
            {formData.certifications.map((cert: any) => (
              <div key={cert.id} className="mb-3 last:mb-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-bold text-[13px] text-black">{cert.name}</p>
                  <span className="text-[12px] text-gray-900">
                    {formatDate(cert.issueDate)}
                  </span>
                </div>
                <div className="flex justify-between items-baseline">
                  <p className="text-[13px] text-black italic">
                    {cert.issuingOrganization}
                    {cert.credentialId && <span className="not-italic"> — {cert.credentialId}</span>}
                  </p>
                  {cert.expirationDate && (
                    <span className="text-[12px] text-gray-900 italic">Expires: {formatDate(cert.expirationDate)}</span>
                  )}
                </div>
                {cert.credentialUrl && (
                  <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="text-[12px] underline block mt-0.5">
                    View Credential
                  </a>
                )}
              </div>
            ))}
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-end px-6 py-4 border-b">
        <div className="w-fit flex justify-end">
          <CustomButton onClick={handleDownload} className="btn-primary ">
            Download PDF
          </CustomButton>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto bg-white p-[0.4in] font-serif leading-tight">
        <div className="max-w-[8.5in] mx-auto text-black">
          {sectionOrder
            .filter(id => id !== "additional")
            .map(sectionId => (
              <React.Fragment key={sectionId}>
                {renderSection(sectionId)}
              </React.Fragment>
            ))}
        </div>
      </div>
    </div>
  );
};