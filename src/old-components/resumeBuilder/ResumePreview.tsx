import React from "react";
import DOMPurify from "dompurify";
import { Resume } from "@/types";

interface ResumePreviewProps {
  formData: Resume;
  sectionOrder?: string[];
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({
  formData,
  sectionOrder = [],
}) => {
  const content = formData.content;

  const formatDate = (date: string) => {
    if (!date) return "";
    const [year, month] = date.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  const renderRichText = (html: string) => {
    return (
      <div
        className="prose prose-sm max-w-none text-gray-700"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(html) }}
      />
    );
  };

  const renderSection = (sectionId: string) => {
    switch (sectionId) {
      case "personal":
        return (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              {content.personalInfo?.firstName} {content.personalInfo?.lastName}
            </h1>
            {content.personalInfo?.jobTitle && (
              <p className="text-gray-600 mt-1">
                {content.personalInfo.jobTitle}
              </p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-gray-600 justify-center text-sm">
              {content.personalInfo?.email && (
                <span>{content.personalInfo.email}</span>
              )}
              {content.personalInfo?.phone && (
                <span>{content.personalInfo.phone}</span>
              )}
              {(content.personalInfo?.city ||
                content.personalInfo?.country) && (
                <span>
                  {content.personalInfo.city}
                  {content.personalInfo.city &&
                    content.personalInfo.country &&
                    ", "}
                  {content.personalInfo.country}
                </span>
              )}
            </div>
          </div>
        );

      case "summary":
        if (!content.personalInfo?.summary) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-2">
              Professional Summary
            </h2>
            {renderRichText(content.personalInfo.summary)}
          </section>
        );

      case "experience":
        if (!content.experience?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Work Experience
            </h2>
            {content.experience.map((exp: any) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{exp.position}</p>
                    <p className="text-gray-600 text-sm">
                      {exp.company}
                      {exp.location && <span> — {exp.location}</span>}
                    </p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {formatDate(exp.startDate)} –{" "}
                    {exp.current ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <div className="mt-2">{renderRichText(exp.description)}</div>
                )}
              </div>
            ))}
          </section>
        );

      case "education":
        if (!content.education?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Education
            </h2>
            {content.education.map((edu: any) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">
                      {edu.degree}
                      {edu.fieldOfStudy && <span> in {edu.fieldOfStudy}</span>}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {edu.institution}
                      {edu.location && <span> — {edu.location}</span>}
                    </p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {formatDate(edu.startDate)} –{" "}
                    {edu.current ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.description && (
                  <div className="mt-2">{renderRichText(edu.description)}</div>
                )}
              </div>
            ))}
          </section>
        );

      case "skills":
        if (!content.skills?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {content.skills.map((skill: any) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 border border-gray-300 rounded text-xs"
                >
                  {skill.name}
                  {skill.level && (
                    <span className="text-gray-500 ml-1 text-[10px]">
                      ({skill.level})
                    </span>
                  )}
                </span>
              ))}
            </div>
          </section>
        );

      case "courses":
        if (!content.courses?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Courses & Certifications
            </h2>
            {content.courses.map((course: any) => (
              <div key={course.id} className="mb-3">
                <p className="font-medium text-sm">{course.name}</p>
                <p className="text-gray-600 text-sm">{course.institution}</p>
                {course.completionDate && (
                  <p className="text-gray-500 text-xs">
                    {formatDate(course.completionDate)}
                  </p>
                )}
                {course.description && (
                  <div className="mt-1">
                    {renderRichText(course.description)}
                  </div>
                )}
              </div>
            ))}
          </section>
        );

      case "internships":
        if (!content.internships?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Internships
            </h2>
            {content.internships.map((internship: any) => (
              <div key={internship.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{internship.position}</p>
                    <p className="text-gray-600 text-sm">
                      {internship.company}
                      {internship.location && (
                        <span> — {internship.location}</span>
                      )}
                    </p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {formatDate(internship.startDate)} –{" "}
                    {formatDate(internship.endDate)}
                  </span>
                </div>
                {internship.description && (
                  <div className="mt-2">
                    {renderRichText(internship.description)}
                  </div>
                )}
              </div>
            ))}
          </section>
        );

      case "hobbies":
        if (!content.hobbies?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Hobbies & Interests
            </h2>
            <div className="space-y-2">
              {content.hobbies.map((hobby: any) => (
                <div key={hobby.id}>
                  <p className="font-medium text-sm">{hobby.name}</p>
                  {hobby.description && (
                    <p className="text-gray-600 text-sm">{hobby.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case "languages":
        if (!content.languages?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Languages
            </h2>
            <div className="space-y-2">
              {content.languages.map((language: any) => (
                <div
                  key={language.id}
                  className="flex justify-between items-center"
                >
                  <p className="text-sm">{language.name}</p>
                  <p className="text-gray-600 text-xs capitalize">
                    {language.proficiency}
                  </p>
                </div>
              ))}
            </div>
          </section>
        );

      case "references":
        if (!content.references?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              References
            </h2>
            {content.references.map((reference: any) => (
              <div key={reference.id} className="mb-4">
                <p className="font-medium text-sm">{reference.name}</p>
                <p className="text-gray-600 text-sm">
                  {reference.position} at {reference.company}
                </p>
                <p className="text-gray-600 text-xs">{reference.email}</p>
                {reference.phone && (
                  <p className="text-gray-600 text-xs">{reference.phone}</p>
                )}
              </div>
            ))}
          </section>
        );

      case "projects":
        if (!content.projects?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Projects
            </h2>
            {content.projects.map((project: any) => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{project.title}</p>
                    {project.technologies?.length > 0 && (
                      <p className="text-gray-600 text-xs">
                        {project.technologies.join(", ")}
                      </p>
                    )}
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {formatDate(project.startDate)}
                    {project.endDate && ` — ${formatDate(project.endDate)}`}
                  </span>
                </div>
                {project.description && (
                  <div className="mt-2">
                    {renderRichText(project.description)}
                  </div>
                )}
                {project.link && (
                  <p className="text-blue-600 text-xs mt-1 break-all">
                    {project.link}
                  </p>
                )}
              </div>
            ))}
          </section>
        );

      case "certifications":
        if (!content.certifications?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Certifications
            </h2>
            {content.certifications.map((cert: any) => (
              <div key={cert.id} className="mb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{cert.name}</p>
                    <p className="text-gray-600 text-sm">
                      {cert.issuingOrganization}
                    </p>
                    {cert.credentialId && (
                      <p className="text-gray-500 text-xs">
                        Credential ID: {cert.credentialId}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500 text-xs">
                      Issued: {formatDate(cert.issueDate)}
                    </p>
                    {cert.expirationDate && (
                      <p className="text-gray-500 text-xs">
                        Expires: {formatDate(cert.expirationDate)}
                      </p>
                    )}
                  </div>
                </div>
                {cert.credentialUrl && (
                  <p className="text-blue-600 text-xs mt-1 break-all">
                    {cert.credentialUrl}
                  </p>
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
    <div className="flex-1 overflow-y-auto p-10 text-gray-800">
      {sectionOrder
        .filter(id => id !== "additional")
        .map(sectionId => (
          <React.Fragment key={sectionId}>
            {renderSection(sectionId)}
          </React.Fragment>
        ))}
    </div>
  );
};
