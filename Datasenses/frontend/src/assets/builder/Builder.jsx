import React from "react";
import Layout from "./layout/Layout";
import {DndContext} from "@dnd-kit/core";
import {nanoid} from "nanoid";
import {useFormBuilder} from "@/hooks/FormBuilderContext";
import DropArea from "./DropArea";
import DragArea from "./DragArea";
import ElementWrapper from "./dragelement/ElementWrapper";
import {restrictToWindowEdges} from "@dnd-kit/modifiers";
import applicationAPI, {apiPath} from "@/api/applicationAPI";
import {useParams} from "react-router-dom";

export default function Builder() {
  const {formElements, dispatch} = useFormBuilder();
  const elements = React.useMemo(() => formElements);
  const {id} = useParams();
  React.useEffect(() => {
    const fetch = async () => {
      (await applicationAPI(`${apiPath.form.getFormElement}${id}`))
        .get()
        .then((response) => {
          if (response.status) {
            const payload = response.data.content.map((ele) => {
              return {Property: ele, id: nanoid()};
            });
            dispatch({
              type: "addAll",
              payload: payload,
            });
          }
        })
        .catch((error) => console.log(error));
    };
    fetch();
  }, []);
  return (
    <>
      <Layout>
        <main className="w-full h-full flex flex-row items-center flex-grow">
          <DndContext
            autoScroll={true}
            modifiers={[restrictToWindowEdges]}
            onDragEnd={(event) => {
              const {active, over} = event;
              if (
                active?.id.includes("FormElement-") &&
                over?.id.includes("FormElement-DropArea")
              ) {
                const {Property} = active.data.current;
                const id = nanoid();
                dispatch({
                  type: "add",
                  payload: {Property, id},
                });
              }
            }}
          >
            <section className="bg-[url('/Background.svg')] w-5/6 h-full flex justify-center items-center p-5">
              <DropArea>
                {elements.length === 6 ? (
                  <div className="font-bold text-4xl text-center relative top-80 text-gray-400">
                    <p>Drop here</p>
                  </div>
                ) : (
                  elements.map((formEl, i) => (
                    <ElementWrapper props={formEl} key={i} />
                  ))
                )}
              </DropArea>
            </section>
            <aside className="w-1/6 h-full">
              <DragArea />
            </aside>
          </DndContext>
        </main>
      </Layout>
    </>
  );
}
