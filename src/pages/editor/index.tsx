import "tippy.js/dist/tippy.css";
import React, { useMemo, useState, useEffect } from "react";
import Loader from "../../components/Loader";
import { usePromiseTracker, trackPromise } from "react-promise-tracker";
import {
  ELEMENT_IMAGE,
  ELEMENT_PARAGRAPH,
  createPlateComponents,
  createPlateOptions,
  HeadingToolbar,
  MentionSelect,
  PlatePlugin,
  Plate,
  ToolbarSearchHighlight,
  createAlignPlugin,
  createAutoformatPlugin,
  createBlockquotePlugin,
  createBoldPlugin,
  createCodeBlockPlugin,
  createCodePlugin,
  createExitBreakPlugin,
  createHeadingPlugin,
  createHighlightPlugin,
  createHistoryPlugin,
  createKbdPlugin,
  createImagePlugin,
  createItalicPlugin,
  createLinkPlugin,
  createListPlugin,
  createMediaEmbedPlugin,
  createNodeIdPlugin,
  createParagraphPlugin,
  createReactPlugin,
  createResetNodePlugin,
  createSelectOnBackspacePlugin,
  createSoftBreakPlugin,
  createDndPlugin,
  createStrikethroughPlugin,
  createSubscriptPlugin,
  createSuperscriptPlugin,
  createTablePlugin,
  createTodoListPlugin,
  createTrailingBlockPlugin,
  createUnderlinePlugin,
  createDeserializeHTMLPlugin,
  useFindReplacePlugin,
  useMentionPlugin,
  withProps,
  MentionElement,
  ELEMENT_MENTION,
  SPEditor,
  MARK_COLOR,
  withStyledProps,
  StyledLeaf,
  MARK_BG_COLOR,
  createFontColorPlugin,
  createFontBackgroundColorPlugin,
  createDeserializeMDPlugin,
  createDeserializeCSVPlugin,
  createDeserializeAstPlugin,
} from "@udecode/plate";
import {
  createExcalidrawPlugin,
  ExcalidrawElement,
  ELEMENT_EXCALIDRAW,
} from "@udecode/plate-excalidraw";
import { optionsAutoformat } from "./config/autoformatRules";
import { initialValuePlayground } from "./config/initialValues";
import {
  editableProps,
  optionsExitBreakPlugin,
  optionsMentionPlugin,
  optionsResetBlockTypePlugin,
  optionsSoftBreakPlugin,
} from "./config/pluginOptions";
import { renderMentionLabel } from "./config/renderMentionLabel";
import { BallonToolbarMarks, ToolbarButtons } from "./config/Toolbars";
import { withStyledPlaceHolders } from "./config/withStyledPlaceHolders";
import { withStyledDraggables } from "./config/withStyledDraggables";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Search } from "@styled-icons/material/Search";
import { HistoryEditor } from "slate-history";
import { ReactEditor } from "slate-react";
import { useDataContext } from "../../components/dataContext";
import { useRouteMatch } from "react-router";
type TEditor = SPEditor & ReactEditor & HistoryEditor;

const id = "Editor";

let components = createPlateComponents({
  [ELEMENT_MENTION]: withProps(MentionElement, {
    renderLabel: renderMentionLabel,
  }),
  [ELEMENT_EXCALIDRAW]: withProps(ExcalidrawElement, {}),
  [MARK_COLOR]: withStyledProps(StyledLeaf, {
    leafProps: {
      [MARK_COLOR]: ["color"],
    },
  }),
  [MARK_BG_COLOR]: withStyledProps(StyledLeaf, {
    leafProps: {
      [MARK_BG_COLOR]: ["backgroundColor"],
    },
  }),
  // customize your components by plugin key
});
components = withStyledPlaceHolders(components);
components = withStyledDraggables(components);

const options = createPlateOptions({
  // customize your options by plugin key
});

export default function Publish() {
  const { Setter } = useDataContext();
  const [Post, setPost] = useState(getInitialValue());
  const { params }: any = useRouteMatch();
  const Update = Boolean(params.postId);
  const { promiseInProgress } = usePromiseTracker();
  const sleep = (ms: any) => new Promise((r) => setTimeout(r, ms));

  useEffect(() => {
    async function ReadLastPost() {
      await sleep(10);
      await Setter.readPost(params.postId).then((data: any) => {
        setPost(PostContentParser(data));
      });
    }
    if (params.postId) {
      trackPromise(ReadLastPost());
    }
  }, [params.postId, Setter]);

  function PostContentParser(post: any) {
    let content = JSON.parse(post.content);
    return { ...post, content };
  }

  function getInitialValue() {
    let saved: any = localStorage.getItem("qosEditorHistory");
    return Boolean(saved)
      ? JSON.parse(saved)
      : {
          title: "Blog Title",
          content: initialValuePlayground,
          resume: "Make it short but significant",
          category: "choose it here",
        };
  }
  const { setSearch, plugin: searchHighlightPlugin } = useFindReplacePlugin();
  const { getMentionSelectProps, plugin: mentionPlugin } =
    useMentionPlugin(optionsMentionPlugin);

  const pluginsMemo: PlatePlugin<TEditor>[] = useMemo(() => {
    const plugins = [
      createReactPlugin(),
      createHistoryPlugin(),
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createTodoListPlugin(),
      createHeadingPlugin(),
      createImagePlugin(),
      createLinkPlugin(),
      createListPlugin(),
      createTablePlugin(),
      createMediaEmbedPlugin(),
      createCodeBlockPlugin(),
      createExcalidrawPlugin(),
      createAlignPlugin(),
      createBoldPlugin(),
      createCodePlugin(),
      createItalicPlugin(),
      createHighlightPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createFontColorPlugin(),
      createFontBackgroundColorPlugin(),
      createKbdPlugin(),
      createNodeIdPlugin(),
      createDndPlugin(),
      createAutoformatPlugin(optionsAutoformat),
      createResetNodePlugin(optionsResetBlockTypePlugin),
      createSoftBreakPlugin(optionsSoftBreakPlugin),
      createExitBreakPlugin(optionsExitBreakPlugin),
      createTrailingBlockPlugin({
        type: ELEMENT_PARAGRAPH,
      }),
      createSelectOnBackspacePlugin({
        allow: [ELEMENT_IMAGE, ELEMENT_EXCALIDRAW],
      }),
      mentionPlugin,
      searchHighlightPlugin,
    ];

    plugins.push(
      ...[
        createDeserializeMDPlugin({ plugins }),
        createDeserializeCSVPlugin({ plugins }),
        createDeserializeHTMLPlugin({ plugins }),
        createDeserializeAstPlugin({ plugins }),
      ]
    );

    return plugins;
  }, [mentionPlugin, searchHighlightPlugin]);

  function handleInputChange(e: any) {
    document.querySelectorAll("td").forEach((td) => {
      if (td.querySelector("img")) {
        td.classList.add("bg-transparent");
      }
    });
    setPost((prev: any) => {
      if (Array.isArray(e)) {
        prev.content = e;
      } else {
        prev[e.target.name] = e.target.value;
      }
      localStorage.setItem("qosEditorHistory", JSON.stringify(prev));
      return { ...prev };
    });
  }
  async function UpdatePost(Post: any, published: boolean) {
    await sleep(10);
    await Setter.updatePost({
      ...Post,
      published: published,
      content: JSON.stringify(Post.content),
    });
  }

  async function SavePost(Post: any, published: boolean) {
    await sleep(10);
    Setter.savePost(
      {
        ...Post,
        content: JSON.stringify(Post.content),
      },
      published
    );
  }
  function handleSubmit(e: any) {
    e.preventDefault();
    if (Update) {
      trackPromise(UpdatePost(Post, true));
    } else {
      trackPromise(SavePost(Post, true));
    }
  }
  return (
    <div>
      <form id="Editor" onSubmit={handleSubmit} encType="multipart/form-data">
        <RightForm
          Post={Post}
          handleInputChange={handleInputChange}
          Update={Update}
          setPost={setPost}
        />
        <DndProvider backend={HTML5Backend}>
          <Plate
            id={id}
            value={Post.content}
            plugins={pluginsMemo}
            components={components}
            options={options}
            editableProps={editableProps}
            initialValue={Post.content}
            onChange={handleInputChange}
          >
            <HeadingToolbar
              style={{ position: "fixed", padding: "0 10px", left: 0 }}
              className="flex w-full top-0 shadow-lg z-50 justify-between bg-qosgray items-center overflow-auto  hideScroll"
            >
              <div className="flex mx-auto">
                <ToolbarButtons />
              </div>
              <div className="mx-auto writerHeader flex items-center">
                <ToolbarSearchHighlight icon={Search} setSearch={setSearch} />
                <button
                  type="button"
                  onClick={() =>
                    Update
                      ? trackPromise(UpdatePost(Post, false))
                      : trackPromise(SavePost(Post, false))
                  }
                  className="mx-4 text-mlg font-medium bg-opacity-80 h-9 bg-qosblue text-qosgray rounded-md block px-2"
                >
                  {Update ? "Update and Save" : "Save"}
                </button>
              </div>
            </HeadingToolbar>
            <BallonToolbarMarks />
            <MentionSelect
              {...getMentionSelectProps()}
              renderLabel={renderMentionLabel}
            />
          </Plate>
        </DndProvider>
      </form>
      <Loader enable={promiseInProgress} />
    </div>
  );
}

function RightForm({ Post, handleInputChange, Update, setPost }: any) {
  function convertTo() {
    let input: any = document.querySelector("#FilePost");
    let file = input.files[0];
    let reader = new FileReader();
    reader.onloadend = function () {
      let input2: any = document.querySelector("#HiddenInput");
      input2.value = reader.result;
      setPost((prev: any) => {
        return { ...prev, poster: reader.result };
      });
    };
    reader.readAsDataURL(file);
  }
  return (
    <div className="fixed right-4 p-4 rounded-lg z-50 shadow-md w-60 -top-52 bg-qosgray mt-80">
      <div className="mx-auto w-full md:max-w-sm">
        <label className="block">Title</label>
        <input
          value={Post.title}
          onChange={handleInputChange}
          className=""
          name="title"
          type="text"
          required
        />
      </div>
      <div className="mx-auto w-full md:max-w-sm mt-5">
        <label className="block">Category:</label>
        <input
          onChange={handleInputChange}
          type="text"
          list="categoryList"
          name="category"
          required
          value={Post.category}
        />
        <datalist id="categoryList">
          <option value="engineering" />
          <option value="marketing" />
          <option value="company" />
        </datalist>
      </div>
      <div className="mx-auto w-full md:max-w-sm mt-5">
        <label className="block">Resume:</label>
        <textarea
          onChange={handleInputChange}
          maxLength={144}
          minLength={100}
          name="resume"
          placeholder="make a resume or description"
          required
          value={Post.resume}
        ></textarea>
      </div>
      <div className="mx-auto w-full md:max-w-sm mt-5">
        <label className="block">Poster:</label>
        <input
          id="FilePost"
          type="file"
          onChange={() => convertTo()}
          className="border-none text-msm"
        />
        <input
          onChange={handleInputChange}
          type="hidden"
          name="poster"
          value={Post.poster}
          id="HiddenInput"
        />
      </div>
      <div className="mx-auto w-full md:max-w-sm mt-5">
        <select name="lang" onChange={handleInputChange}>
          <option selected={Post.lang === "en"} value="en">
            English
          </option>
          <option selected={Post.lang === "fr"} value="fr">
            Français
          </option>
        </select>
      </div>
      <div className="mx-auto w-full md:max-w-sm mt-5">
        <button className="text-mlg font-medium bg-opacity-80 h-10 bg-qosblue text-qosgray rounded-lg block p-1 mx-auto px-4">
          {Update ? "Update and Publish" : "Publish"}
        </button>
      </div>
    </div>
  );
}
