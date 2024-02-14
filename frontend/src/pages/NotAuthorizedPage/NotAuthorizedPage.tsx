import React from "react";
import {Button, Container, Stack} from "react-bootstrap";
import CustomTitle from "../../components/CustomTitle/CustomTitle";
import {ReactComponent as Error} from "../../assets/error.svg";
import {NavLink} from "react-router-dom";

const NotAuthorizedPage = () => {
    return (
        <Container className={"h-100"}>
            <Stack className={"justify-content-center align-items-center h-100"} gap={4}>
                <Error />
                <CustomTitle className={"h1"}>Нет доступа</CustomTitle>
                <p className={"text-muted"}>Для просмотра страницы необходимо авторизоваться.</p>
                <NavLink to="/" className={"object-fit-contain"}>
                    <Button
                        className={"ps-5 pe-5 pt-2 pb-2 button-dark-green-hover"}
                        variant={"dark"}
                        style={{ background: "#702262", color: "#FFF", border: "none" }}
                    >
                        Войти
                    </Button>
                </NavLink>
            </Stack>
        </Container>
    );
};

export default NotAuthorizedPage;
