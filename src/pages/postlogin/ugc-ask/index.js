import Breadcrumb from "components/common/breadcrumb";
import { CONST, utils } from "core/helper";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { services } from "core/service";
import { useEffect, useState } from "react";
import moment from "moment";
import {
  GET_QUESTION_BY_ID,
  UGC_CREATE_QUESTION,
} from "core/service/api.url.service";
import { SubmitLoading } from "components/common/loading";
import MobileMenu from "components/common/mobileMenu";
import ModalCommon from "components/common/modal";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import add from "date-fns/add";
import { UGC } from "pages/routes/routes";

const validationSchema = Yup.object().shape({
  questions: Yup.string().label(CONST.MSG.REQ_QUESTION).required(),
  start_date: Yup.string().required(CONST.MSG.REQ_START_DATE),
  end_date: Yup.string().required(CONST.MSG.REQ_END_DATE),
  start_time: Yup.string().required(CONST.MSG.REQ_START_TIME),
  end_time: Yup.string().required(CONST.MSG.REQ_END_TIME),
  options: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.string().label(CONST.MSG.REQ_OPTIONS).required(),
      })
    )
    .label(CONST.MSG.REQ_OPTIONS)
    .required(),
  source_url: Yup.string().label(CONST.MSG.REQ_SOURCE).required(),
  is_private: Yup.string().label(CONST.MSG.REQ_SHOW_MY_QUS_ON).required(),
});

const Ask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [show, setShow] = useState(false);
  const { id } = useParams();

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors }, // isValid
    control,
    getValues,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      options: [
        {
          value: "",
        },
        {
          value: "",
        },
      ],
    },
  });

  const options = getValues("options");
  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const handleAppendOption = () => {
    if (options.length >= 4) {
      utils.showErrMsg("Maximun 4 fields are allowed");
      return false;
    }
    append({
      value: "",
    });
  };

  const handleRemoveOption = (ind) => {
    if (fields.length <= 2) {
      utils.showErrMsg("Minimum option is required");
      return false;
    }
    remove(ind);
  };

  const handleOptionChange = (e, i) => {
    const { value } = e.target;
    setValue(`options.${i}.value`, value, {
      shouldValidate: true,
    });
  };

  const handlePrivateChange = (e) => {
    const { value } = e.target;
    setValue("is_private", value, {
      shouldValidate: true,
    });
  };

  const handleChangeFromDate = (date) => {
    if (date) {
      // setValue("start_date", moment(date).format("YYYY-DD-MM"), {
      //   shouldValidate: true,
      // });
      setValue("start_date", date, {
        shouldValidate: true,
      });
      setStartDate(date);
      setEndDate("");
    }
  };

  const handleChangeEndDate = (date) => {
    if (date) {
      setValue("end_date", date, {
        shouldValidate: true,
      });
      setEndDate(date);
    }
  };

  const handleChangeFromTime = (time) => {
    if (time) {
      setValue("start_time", time, {
        shouldValidate: true,
      });
      // setEndTime("")
      setStartTime(time);
    }
  };

  const handleChangeEndTime = (time) => {
    if (time) {
      setValue("end_time", time, {
        shouldValidate: true,
      });
      setEndTime(time);
    }
  };

  const formatDate = (date) => {
    return moment(date).format("YYYY-DD-MM");
  };

  const formatTime = (time) => {
    return moment(time).format("hh:mm");
  };

  const onSubmit = async (values) => {
    try {
      // setLoading(true);
      const optionsArr = [];
      const {
        start_date,
        start_time,
        is_private,
        end_date,
        end_time,
        questions,
        source_url,
        minimum,
      } = values;

      if (values?.options?.length > 0) {
        values?.options.map((e) => {
          return optionsArr.push(e.value);
        });
      }

      let formatFromDate = formatDate(start_date);
      let formatStartTime = formatTime(start_time);

      let formatToDate = formatDate(end_date);
      let formatEndTime = formatTime(end_time);

      let convertStartTime = moment(
        formatFromDate + " " + formatStartTime,
        "YYYY-DD-MM HH:mm"
      ).format();
      let convertEndTime = moment(
        formatToDate + " " + formatEndTime,
        "YYYY-DD-MM HH:mm"
      ).format();

      const payload = {
        start_time: convertStartTime,
        endTime: convertEndTime,
        is_private,
        options: optionsArr,
        questions,
        source_url,
        minimum,
      };
      const resp = await services.post(UGC_CREATE_QUESTION, payload);
      if (resp?.status) {
        utils.showSuccessMsg(resp.message);
        reset();
        setLoading(false);
        navigate(UGC);
      } else {
        setLoading(false);
      }
    } catch (err) {
      throw err.message;
    }
  };

  const loadQuestionById = async (id) => {
    const resp = await services.get(GET_QUESTION_BY_ID + id);
    if (resp?.status) {
      const { options, is_private, start_time, end_time } = resp?.result;
      const fields = [
        "question",
        "start_time",
        "end_time",
        "is_private",
        "source_url",
      ];
      const startDate = new Date(start_time);
      const endDateFormat = new Date(end_time);

      const startTime = new Date(start_time);
      const endTime = new Date(end_time);

      setValue("start_date", startDate, {
        shouldValidate: true,
      });
      setStartDate(startDate);
      setValue("start_time", startTime, {
        shouldValidate: true,
      });
      setStartTime(startTime);

      setValue("end_date", endDateFormat, {
        shouldValidate: true,
      });
      setEndDate(endDateFormat);

      setValue("end_time", endDateFormat, {
        shouldValidate: true,
      });
      setEndTime(endTime);

      let optionsArr = [];
      optionsArr.push({
        value: options,
      });
      if (options.length > 0) {
        options.map((e, idx) => {
          return setValue(`options.${idx}.value`, e?.option, {
            shouldValidate: true,
          });
        });
      }
      fields.forEach((field) => {
        setValue(field, resp?.result?.[field], { shouldValidate: true });
      });
      setValue(`is_private`, is_private?.toString(), { shouldValidate: true });
    }
  };

  useEffect(() => {
    setComponentMounted(true);
  }, []);

  const [isComponentMounted, setComponentMounted] = useState(false);
  useEffect(() => {
    const handleChange = async (id) => {
      await loadQuestionById(id);
    };
    if (isComponentMounted && id) {
      handleChange(id);
    }
  }, [isComponentMounted, id]);

  return (
    <div className="page_container">
      <Breadcrumb title={"UGC"} />
      <Container>
        <Row>
          <Col md={6}>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="ugc_ask_form_wrap">
                <div className="ugc_ask_input_wrap">
                  <h2> Create your own Question</h2>
                  <Form.Control
                    as={"textarea"}
                    maxLength={180}
                    type="text"
                    placeholder="Enter your Question"
                    {...register("questions")}
                  />
                  {errors?.questions && (
                    <span className="text-danger">
                      {errors?.questions?.message}
                    </span>
                  )}
                </div>
                <div className="ugc_ask_input_wrap">
                  <h2>Options</h2>
                  {fields.map((e, i) => (
                    <div className="ugc_ask_input_option_sec">
                      <div>
                        <Form.Control
                          maxLength={40}
                          type="text"
                          placeholder="Enter your Question"
                          {...register(`options.${i}.value`)}
                          onChange={(e) => handleOptionChange(e, i)}
                        />
                        {errors?.options && (
                          <span className="text-danger">
                            {errors.options?.[i]?.value?.message}
                          </span>
                        )}
                      </div>
                      <span
                        onClick={() => handleRemoveOption(i)}
                        className="ugc_ask_input_wrap_option_create_icon"
                      >
                        {utils.minusIcon(20, 20, "#000")}
                      </span>
                    </div>
                  ))}
                </div>
                <span
                  onClick={handleAppendOption}
                  className="ugc_ask_input_wrap_option_create_icon"
                >
                  {utils.plusdarkicon(14, 14, "#000")}
                </span>
                <div className="ugc_ask_input_wrap">
                  <h2>Source of Truth</h2>
                  <Form.Control
                    type="text"
                    placeholder="Link to track the event"
                    {...register("source_url")}
                  />
                  {errors?.source_url && (
                    <span className="text-danger">
                      {errors?.source_url?.message}
                    </span>
                  )}
                </div>
                <div className="ugc_ask_input_wrap">
                  <h2>Show My Question on</h2>
                  <div className="ugc_ask_input_radio_sec">
                    <Form.Check
                      type="radio"
                      id="radio_1"
                      {...register("is_private")}
                      name="own_question"
                      value={false}
                      onChange={(e) => handlePrivateChange(e)}
                    />
                    <Form.Label htmlFor="radio_1">
                      Homescreen on UGC Category
                    </Form.Label>
                  </div>
                  <div className="ugc_ask_input_radio_sec">
                    <Form.Check
                      type="radio"
                      {...register("is_private")}
                      id="radio_2"
                      name="own_question"
                      onChange={(e) => handlePrivateChange(e)}
                      value={true}
                    />
                    <Form.Label htmlFor="radio_2">
                      Private{" "}
                      <span>
                        (Share it with your Friends using unique code)
                      </span>
                    </Form.Label>
                  </div>
                </div>
                {errors?.is_private && (
                  <span className="text-danger">
                    {errors?.is_private?.message}
                  </span>
                )}
                <Row>
                  <Col md={4}>
                    <div className="ugc_ask_input_wrap">
                      <h2>Per User Limit</h2>
                      <Form.Select {...register("minimum")} className="arrow">
                        <option>10</option>
                        <option>20</option>
                        <option>30</option>
                      </Form.Select>
                    </div>
                    {errors?.maximum && (
                      <span className="text-danger">
                        {errors?.minimum?.message}
                      </span>
                    )}
                  </Col>
                </Row>
                <div className="ugc_ask_input_wrap">
                  <h2>Start Time</h2>
                  <Row>
                    <Col md={4}>
                      <div className="ugc_ask_date_wrap">
                        <DatePicker
                          selected={startDate}
                          onChange={(date) => handleChangeFromDate(date)}
                          placeholderText="Select Start Date"
                          className="form-control w-100"
                          dropdownMode="select"
                          minDate={new Date()}
                          maxDate={add(new Date(), { days: 4 })}
                        />
                        {errors?.start_date && (
                          <span className="text-danger">
                            {errors?.start_date?.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="ugc_ask_date_wrap">
                        <DatePicker
                          selected={startTime}
                          onChange={(time) => handleChangeFromTime(time)}
                          placeholderText="Select Start Time"
                          className="form-control w-100"
                          dropdownMode="select"
                          showTimeSelect
                          showTimeSelectOnly
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          // minTime={new Date().getTime()}
                          // maxTime={startTime}
                        />
                        {errors?.start_time && (
                          <span className="text-danger">
                            {errors?.start_time?.message}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
                <div className="ugc_ask_input_wrap ugc_ask_input_end_time">
                  <h2>End Time</h2>
                  <Row>
                    <Col md={4}>
                      <div className="ugc_ask_date_wrap">
                        <DatePicker
                          selected={endDate}
                          onChange={(date) => handleChangeEndDate(date)}
                          placeholderText="Select End Date"
                          className="form-control w-100"
                          dropdownMode="select"
                          maxDate={add(new Date(), { days: 4 })}
                          // disabled={!startTime}
                          minDate={new Date()}
                        />
                        {errors?.end_date && (
                          <span className="text-danger">
                            {errors?.end_date?.message}
                          </span>
                        )}
                      </div>
                    </Col>
                    <Col md={4}>
                      <div className="ugc_ask_date_wrap">
                        <DatePicker
                          selected={endTime}
                          onChange={(date) => handleChangeEndTime(date)}
                          showTimeSelect
                          showTimeSelectOnly
                          timeCaption="Time"
                          dateFormat="h:mm aa"
                          placeholderText="Select End Time"
                          className="form-control w-100"
                          // minTime={startTime}
                          // maxTime={endTime}
                        />
                        {errors?.end_time && (
                          <span className="text-danger">
                            {errors?.end_time?.message}
                          </span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <span>
                    Trades need to be settled within 24 hrs post expiry
                  </span>
                </div>
                <Button disabled={loading} type="submit">
                  Create Question {loading && <SubmitLoading />}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <MobileMenu />
      </Container>

      {/* UGC-MODAL-POPUP */}

      <ModalCommon
        show={show}
        onHide={handleClose}
        className="ugc_modal_wrapper"
        centered={true}
      >
        <div className="ugc_modal">
          <h2>Are you sure you want to Submit “21” as the answer?</h2>
          <p>
            Answer once selected can not be changed later. In case you decide to
            cancel the quiz, every participant will get a full refund
          </p>
          <div>
            <Button>Cancel</Button>
            <Button>Yes, Submit</Button>
          </div>
        </div>
      </ModalCommon>
    </div>
  );
};

export default Ask;
