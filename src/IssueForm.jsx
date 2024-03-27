import React from "react";

const IssueForm = () => {
  return (
    <div className="p-8 pb-20 w-full h-screen">
      <h2 className="text-4xl text-center">Upload Issue Form</h2>
      <form
        action="/issue"
        method="post"
        className="w-4/5 flex flex-col justify-center items-center max-w-[40rem] m-auto text-2xl ring-2 ring-sky-200 rounded-lg h-4/5"
      >
        <label htmlFor="issueType">Issue Type</label>
        <input type="text" name="issueTyepe" id="issueType" />
        <label htmlFor="description">Description</label>
        <textarea name="description" id="description"></textarea>
      </form>
    </div>
  );
};

export default IssueForm;
