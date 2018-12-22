export function didContentChange(currentProps, nextProps) {
  return (
    currentProps.ellipsis !== nextProps.ellipsis ||
    currentProps.children !== nextProps.children
  );
}
