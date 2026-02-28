export const setCookie = (name: string, value: string, days = 1) => {
    if (typeof document === "undefined") return;
    
    try {
      const maxAge = days * 24 * 60 * 60;
      const secure = typeof window !== "undefined" && window.location?.protocol === "https:";
      const domain = window.location.hostname === 'localhost' 
        ? '' 
        : 'domain=.' + window.location.hostname.split('.').slice(-2).join('.');
      
      const cookieParts = [
        `${name}=${encodeURIComponent(value)}`,
        `path=/`,
        domain, // Add domain for production
        `max-age=${maxAge}`,
        `SameSite=Lax`,
        ...(secure ? ["Secure"] : [])
      ].filter(Boolean); // Remove empty strings
      
      document.cookie = cookieParts.join("; ");
    } catch (error) {
      console.error("Failed to set cookie:", error);
    }
  };