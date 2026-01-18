import CustomButton from "@/Reusables/CustomButton";
import React from "react";

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

  const renderSection = (sectionId: string) => {
    switch(sectionId) {
      case 'personal':
        return (
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold tracking-tight">
              {formData.personalInfo?.firstName} {formData.personalInfo?.lastName}
            </h1>
            {formData.personalInfo?.professionalTitle && (
              <p className="text-gray-600 mt-1">{formData.personalInfo.professionalTitle}</p>
            )}
            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-gray-600 justify-center text-sm">
              {formData.personalInfo?.email && <span>{formData.personalInfo.email}</span>}
              {formData.personalInfo?.phone && <span>{formData.personalInfo.phone}</span>}
              {(formData.personalInfo?.city || formData.personalInfo?.country) && (
                <span>
                  {formData.personalInfo.city}
                  {formData.personalInfo.city && formData.personalInfo.country && ", "}
                  {formData.personalInfo.country}
                </span>
              )}
            </div>
          </div>
        );

      case 'summary':
        if (!formData.summary) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-2">
              Professional Summary
            </h2>
            <p className="text-sm text-justify">{formData.summary}</p>
          </section>
        );

      case 'experience':
        if (!formData.experience?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Work Experience
            </h2>
            {formData.experience.map((exp: any) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{exp.jobTitle}</p>
                    <p className="text-gray-600 text-sm">
                      {exp.employer}
                      {(exp.city || exp.country) && (
                        <span>
                          {" "}— {exp.city}
                          {exp.city && exp.country && ", "}
                          {exp.country}
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {formatDate(exp.startDate)} – {exp.currentlyWorking ? "Present" : formatDate(exp.endDate)}
                  </span>
                </div>
                {exp.description && (
                  <p className="mt-2 text-gray-700 text-sm whitespace-pre-wrap">{exp.description}</p>
                )}
              </div>
            ))}
          </section>
        );

      case 'education':
        if (!formData.education?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Education
            </h2>
            {formData.education.map((edu: any) => (
              <div key={edu.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{edu.degree}</p>
                    <p className="text-gray-600 text-sm">
                      {edu.school}
                      {(edu.city || edu.country) && (
                        <span>
                          {" "}— {edu.city}
                          {edu.city && edu.country && ", "}
                          {edu.country}
                        </span>
                      )}
                    </p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {formatDate(edu.startDate)} – {edu.currentlyStudying ? "Present" : formatDate(edu.endDate)}
                  </span>
                </div>
                {edu.description && (
                  <p className="mt-2 whitespace-pre-wrap text-gray-700 text-sm">
                    {edu.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        );

      case 'skills':
        if (!formData.skills?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((skill: any) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 border border-gray-300 rounded text-xs"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        );

      case 'courses':
        if (!formData.courses?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Courses & Certifications
            </h2>
            {formData.courses.map((course: any) => (
              <div key={course.id} className="mb-3">
                <p className="font-medium text-sm">{course.name}</p>
                <p className="text-gray-600 text-sm">{course.institution}</p>
                {course.completionDate && (
                  <p className="text-gray-500 text-xs">{formatDate(course.completionDate)}</p>
                )}
                {course.description && (
                  <p className="mt-1 text-gray-700 text-sm">{course.description}</p>
                )}
              </div>
            ))}
          </section>
        );

      case 'internships':
        if (!formData.internships?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Internships
            </h2>
            {formData.internships.map((internship: any) => (
              <div key={internship.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">{internship.position}</p>
                    <p className="text-gray-600 text-sm">{internship.company}</p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {formatDate(internship.startDate)} – {formatDate(internship.endDate)}
                  </span>
                </div>
                {internship.description && (
                  <p className="mt-2 text-gray-700 text-sm whitespace-pre-wrap">{internship.description}</p>
                )}
              </div>
            ))}
          </section>
        );

      case 'hobbies':
        if (!formData.hobbies?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Hobbies & Interests
            </h2>
            <div className="space-y-2">
              {formData.hobbies.map((hobby: any) => (
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

      case 'languages':
        if (!formData.languages?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              Languages
            </h2>
            <div className="space-y-2">
              {formData.languages.map((language: any) => (
                <div key={language.id} className="flex justify-between items-center">
                  <p className="text-sm">{language.name}</p>
                  <p className="text-gray-600 text-xs capitalize">{language.proficiency}</p>
                </div>
              ))}
            </div>
          </section>
        );

      case 'references':
        if (!formData.references?.length) return null;
        return (
          <section className="mb-6">
            <h2 className="font-semibold uppercase text-xs tracking-wider text-gray-700 mb-3">
              References
            </h2>
            {formData.references.map((reference: any) => (
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
      <div className="flex-1 overflow-y-auto p-10 text-gray-800">
        {sectionOrder
          .filter(id => id !== "additional")
          .map(sectionId => (
            <React.Fragment key={sectionId}>
              {renderSection(sectionId)}
            </React.Fragment>
          ))}
      </div>
    </div>
  );
};