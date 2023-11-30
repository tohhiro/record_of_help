import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { Form, Props } from ".";

describe("Form", () => {
    describe("radio",()=>{
        test("radioボタンが2つレンダリングされる", () => {
            render(<Form />);
            const radioButtons = screen.getAllByRole("radio");
            expect(radioButtons).toHaveLength(2);
        });
        test("radioボタンのvalue属性が正しく設定されている", () => {
            render(<Form />);
            const radioButtonValues = ["eito", "mei"];
            radioButtonValues.forEach((value) => {
                const radioButton = screen.getByRole("radio", { name: value });
                expect(radioButton).toHaveAttribute("value", value);
            })
       });
       test("radioボタンのチェックを入れると、チェックされたradioボタンの属性がcheckedになっている", async () => {
        render(<Form />);
        const user = userEvent.setup()
        const radioButtonValues = ["eito", "mei"];
        radioButtonValues.forEach(async (value) => {
            const radioButton = screen.getByRole("radio", { name: value });
            userEvent.click(radioButton)
            await waitFor(() => expect(radioButton).toHaveAttribute("checked", true));
        })
   });
    })
});