import React from 'react';
import {Button, Form} from "react-bootstrap";
import CreateProducts from "../CreateProducts/CreateProducts";
import {FormProvider, SubmitHandler, useFieldArray, useForm} from "react-hook-form";
import {emptyRow} from "../../types/IOrderRowCreate";
import IFormCreate from "../../types/IFormCreate";
import {useCreateOrderMutation} from "../../services/DashboardService";
import {useAppDispatch} from "../../hooks/useAppDispatch";
import {showError, toggleLoading, toggleModal} from "../../store/slices/utilsSlice";
import {useAppSelector} from "../../hooks/useAppSelector";
import moment from "moment";

const CreateOrder = () => {
    const products = useAppSelector(state => state.dashboard.products);
    const methods = useForm<IFormCreate>();
    const {fields, append, remove} = useFieldArray({
        control: methods.control,
        name: "rows",
        rules: {
            validate: (value) => value.length !== 0
        }
    });
    const [createOrder] = useCreateOrderMutation();
    const dispatch = useAppDispatch();
    const currentDateString = useAppSelector(state => state.utils.currentDate);


    const onSubmit: SubmitHandler<IFormCreate> = async (formData) => {
        let isEnough = true;
        const needed: string[] = [];

        for (const row of formData.rows) {
            const founded = products.find(product => String(product.id) === String(row.product));

            if (row.number > (founded ? founded.number : 0)) {
                isEnough = false;
                needed.push(`${founded ? founded.name : 'Product'} - ${row.number - (founded ? founded.number : 0)}`);
            }
        }

        if (isEnough) {
            dispatch(toggleLoading());
            await createOrder({...formData});
            dispatch(toggleLoading());
            dispatch(toggleModal());
        } else {
            dispatch(showError(`Need ${needed.join(' ')}`));
        }
    };

    const validateDate = (v: string) => {
        const currentDate = moment(currentDateString, "DD.MM.YYYY").toDate();

        return (new Date(v)).setHours(0, 0, 0, 0) > currentDate.setHours(0, 0, 0, 0)
    };

    return (
        <FormProvider {...methods}>
            <Form className={"p-2 d-flex flex-column h-100"} onSubmit={methods.handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="orderCreateCustomer">
                    <Form.Label className={"ms-2 fw-bold"}>Customer</Form.Label>
                    <Form.Control type="text" placeholder="Enter customer" {...methods.register("customer", {required: true})}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="orderCreateDate">
                    <Form.Label className={"ms-2 fw-bold"}>Order Date</Form.Label>
                    <Form.Control
                        type="date"
                        {...methods.register("order_date",
                            {
                                required: true,
                                validate: validateDate
                            })}
                    />
                </Form.Group>
                <CreateProducts
                    productsForms={fields}
                    append={() => append(emptyRow)}
                    remove={remove}
                />
                <Button style={{ background: "#702262", color: "#FFF", border: "none" }} className={"button-dark-green-hover"} type="submit">
                    Create Order
                </Button>
            </Form>
        </FormProvider>
    );
}

export default CreateOrder;