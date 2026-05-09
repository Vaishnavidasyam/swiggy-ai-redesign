export default function PrimaryButton({ children, style, ...props }) {
  return (
    <button
      {...props}
      style={{
        width: "100%",
        padding: "12px 16px",
        borderRadius: 999,
        border: "none",
        background: "#ff5200",
        color: "#fff",
        fontWeight: 600,
        fontSize: 15,
        cursor: "pointer",
        marginTop: 12,
        ...style,
      }}
    >
      {children}
    </button>
  );
}
