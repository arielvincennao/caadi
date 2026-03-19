import LinkForm from "../components/forms/LinkForm";
import TitleForm from "../components/forms/TitleForm";

export const BLOCK_FORMS = {
  link: LinkForm,
  steps: (props) => (
    <TitleForm
      {...props}
      onSubmit={(data) =>
        props.onSubmit({
          ...data,
          steps: []
        })
      }
    />
  ),
  list: (props) => (
    <TitleForm
      {...props}
      onSubmit={(data) =>
        props.onSubmit({
          ...data,
          list: []
        })
      }
    />
  )
};