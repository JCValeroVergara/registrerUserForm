import React from 'react';
import Info from './Info';

const AlertMessage = ({ errorMsg }) => {
  return errorMsg ? (
    <div
      className="mt-2 flex items-center justify-center p-4 mb-4 text-sm text-red-600 border border-red-600 rounded-lg bg-red-100 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
      role="alert"
    >
      <Info className="w-5 h-5 mr-3 text-red-400" />
      <span className="sr-only">Info</span>
      <div>
        {Object.entries(errorMsg).map(([key, value]) => (
          value !== null && (
          <span key={key} className="block font-medium">
            {`${value}`}
          </span>
        )))}
      </div>
    </div>
  ) : null;
};

export default AlertMessage;