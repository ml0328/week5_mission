import React from 'react';
import { useForm } from 'react-hook-form';// 폼상태와 유효성 검사를 쉽게 관리
import { yupResolver } from '@hookform/resolvers/yup';  
import * as yup from 'yup';  // 유효성 검사 규칙을 정의
import styled from 'styled-components';
// React, useForm, yup, styled-components 패키지를 불러온다.

// Yup 스키마 정의  (실습에서 배운 내용_이해했음!)
const schema = yup.object().shape({
    email: yup.string().required('이메일을 입력해 주세요!').email('유효한 이메일 형식이 아닙니다.'),
    password: yup.string()
        .required('비밀번호를 입력해 주세요!')
        .min(8, '비밀번호는 8자 이상이어야 합니다.')
        .max(16, '비밀번호는 16자 이하이어야 합니다.'),
    passwordCheck: yup.string()
        .required('비밀번호를 다시 입력해 주세요!')
        .oneOf([yup.ref('password'), null], '비밀번호가 일치하지 않습니다.'),
});

const SignUpPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
// SignUpPage -> 컴포넌트 정의 + useForm 을 호출해서 register, handleSubmit, errors 객체를 얻는다
/* register: 입력 필드를 react-hook-form 과 연결
handleSubmit: 폼이 제출될 때 호출할 함수 지정
errors: yup 유효성 검사를 통해 발생한 에러 메세지들 포함  */

    const onSubmit = (data) => {
        console.log(data);
        // 폼 제출될 때 호출(확인용)
    };

    return (
        <Container>
            <Title>회원가입</Title>  
            <Form onSubmit={handleSubmit(onSubmit)}>  
                <InputWrapper>
                    <Input
                        type="email"
                        placeholder="이메일을 입력해주세요."
                        {...register('email')}
                    />
                    {errors.email && <ErrorText>{errors.email.message}</ErrorText>}
                </InputWrapper>
                <InputWrapper>
                    <Input
                        type="password"
                        placeholder="비밀번호를 입력해주세요."
                        {...register('password')}
                    />
                    {errors.password && <ErrorText>{errors.password.message}</ErrorText>}
                </InputWrapper>
                <InputWrapper>
                    <Input
                        type="password"
                        placeholder="비밀번호를 다시 입력해주세요."
                        {...register('passwordCheck')}
                    />
                    {errors.passwordCheck && <ErrorText>{errors.passwordCheck.message}</ErrorText>}
                </InputWrapper>
                <SubmitButton type="submit">제출</SubmitButton>
            </Form>
        </Container>
    );
};
/* return 이해하기
Container, Title, Form 컴포넌트를 렌더링 + InputWrapper 내부에는 Input 컴포넌트 넣었음!
Form 에 onSubmit 이벤트로 handleSubmit(onSubmit)을 지정하여 유효성 검사가 통과 -> onSubmit 호출!
register('email'): email 입력 필드를 react-hook-form과 연결
 마지막에 SubmitButton 컴포넌트로 제출 버튼을 생성*/


// styled-components 정의 시작!
const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background-color: #121212;
    color: white;
`;

const Title = styled.h1`
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const InputWrapper = styled.div`
    margin-bottom: 15px;
`;
// InputWrapper: SignUpPage 컴포넌트에서 각 입력 필드와 해당 에러 메시지를 감싸는 역할을 하는 스타일드 컴포넌트

const Input = styled.input`
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 100%;
    background-color: #fff;
    color: #000;

    &:focus {
        border-color: #007bff;
        outline: none;
    }
`;

const ErrorText = styled.span`
    color: red;
    font-size: 12px;
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #ff3333;
    }
`;

export default SignUpPage;
