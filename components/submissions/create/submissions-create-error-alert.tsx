interface SubmissionsCreateErrorAlertProps {
  message: string;
}

export function SubmissionsCreateErrorAlert({ message }: SubmissionsCreateErrorAlertProps) {
  return (
    <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-600 text-sm">
      {message}
    </div>
  );
}
