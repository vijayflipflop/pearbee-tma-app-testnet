const ProtectedRoutes = ({ children }) => {
  return (
    <div id="main-wrapper pearbee_fallback_loading_wrap">
      {children}
    </div>
  );
};

export default ProtectedRoutes;
