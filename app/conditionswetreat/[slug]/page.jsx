"use client";
import React from "react";

const ConditionPage = ({ params }) => {
  const { slug } = React.use(params);
  const [Component, setComponent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const loadComponent = async () => {
      try {
        setLoading(true);
        let component;

        // Map slugs to their folder and component names
        const componentMap = {
          "premature-ejaculation": {
            folder: "PrematureEjaculationPage",
            file: "PrematureEjaculationPage"
          },
          "low-sperm-count": {
            folder: "LowSpermCountPage", 
            file: "LowSpermCountPage"
          },
          "erectile-dysfunction": {
            folder: "ErectileDysfunctionPage",
            file: "ErectileDysfunctionPage"
          }
        };

        const componentInfo = componentMap[slug];
        
        if (componentInfo) {
          // Use absolute paths from the project root
          const possiblePaths = [
            `@/components/ConditionsWeTreatPage/${componentInfo.folder}/${componentInfo.file}`,
            `@/components/ConditionsWeTreatPage/${componentInfo.folder}/index`,
            `@/components/ConditionsWeTreatPage/${componentInfo.folder}`,
          ];

          console.log(`Attempting to load component for slug: ${slug}`);
          console.log(`Looking for folder: ${componentInfo.folder}`);

          // Try each path until one works
          for (const path of possiblePaths) {
            try {
              console.log(`🔍 Trying: ${path}`);
              const module = await import(path);
              component = module.default || module;
              console.log(`✅ Successfully loaded from: ${path}`);
              break;
            } catch (err) {
              console.log(`❌ Failed ${path}:`, err.message);
              
              // If @/ alias doesn't work, try direct relative paths
              if (path.startsWith('@/')) {
                const relativePath = path.replace('@/', '../../../');
                try {
                  console.log(`🔍 Trying relative: ${relativePath}`);
                  const relativeModule = await import(relativePath);
                  component = relativeModule.default || relativeModule;
                  console.log(`✅ Successfully loaded from relative: ${relativePath}`);
                  break;
                } catch (relativeErr) {
                  console.log(`❌ Failed relative ${relativePath}:`, relativeErr.message);
                }
              }
            }
          }

          // If still no component found, try without file extension variations
          if (!component) {
            const fallbackPaths = [
              `../../../components/ConditionsWeTreatPage/${componentInfo.folder}/${componentInfo.file}.jsx`,
              `../../../components/ConditionsWeTreatPage/${componentInfo.folder}/${componentInfo.file}.js`,
              `../../../components/ConditionsWeTreatPage/${componentInfo.folder}/index.jsx`,
              `../../../components/ConditionsWeTreatPage/${componentInfo.folder}/index.js`,
            ];

            for (const path of fallbackPaths) {
              try {
                console.log(`🔍 Fallback trying: ${path}`);
                const module = await import(path);
                component = module.default || module;
                console.log(`✅ Successfully loaded from fallback: ${path}`);
                break;
              } catch (err) {
                console.log(`❌ Fallback failed ${path}:`, err.message);
              }
            }
          }
        }

        if (component) {
          setComponent(() => component);
        } else {
          console.error('All import attempts failed');
          setError(`Could not load component for "${slug}". Available conditions: ${Object.keys(componentMap).join(", ")}`);
        }
      } catch (err) {
        console.error('Error loading component:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadComponent();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading {slug} page...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-md mx-auto p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">
            Check the browser console for detailed error messages about which paths were tried.
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Component not found</h2>
          <p className="text-gray-600">No component available for "{slug}"</p>
        </div>
      </div>
    );
  }

  return <Component />;
};

export default ConditionPage;