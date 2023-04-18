import React, {  useState } from "react";
import { useHttpResponse } from "./useHttpResponse";


function Questions() {
    const {result, error, badRequest,  loading} = useHttpResponse("http://localhost:8000/score", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          test: "test",
        },
      });
    return (
        <div>Questions</div>
    )
}

export default Questions;