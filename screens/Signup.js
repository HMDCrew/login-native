import React, { Fragment } from 'react';
import { StyleSheet, SafeAreaView, View } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import ErrorMessage from '../components/ErrorMessage';



const validationSchema = Yup.object().shape({
  name: Yup.string()
    .label('Name')
    .required('Please enter your name')
    .min(5, 'Please enter your name and surname'),
  email: Yup.string()
    .label('Email')
    .email('Enter a valid email')
    .required('Please enter a registered email'),
  password: Yup.string()
    .label('Password')
    .required()
    .min(4, 'Password must have at least 4 characters '),
  passwordConfirmation: Yup.string()
    .label('Password')
    .required()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .min(4, 'Password must have at least 4 characters '),
  check: Yup.boolean().oneOf([true], 'Please check the agreement')
})


export default class Signup extends React.Component {
  
  goToLogin = () => this.props.navigation.navigate('Login');
  
  handleSubmit = values => {
    if (values.email.length > 0 && values.password.length > 0) {
      setTimeout(() => {
        this.props.navigation.navigate('App')
      }, 3000)
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Formik
          initialValues={{ name: '', email: '', password: '', passwordConfirmation: '', check: false }}
          onSubmit={values => {this.handleSubmit(values)}}

          validationSchema={validationSchema}>
          {({ handleChange, values, handleSubmit, errors, isValid, isSubmitting, touched, handleBlur, setFieldValue }) => (
            <Fragment>
              <FormInput
                name='name'
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder='Enter you Name'
                autoCapitalize='none'
                iconName='person'
                iconColor='#2C384A'
                onBlur={handleBlur('name')}
              />
              <ErrorMessage errorValue={touched.name && errors.name}  />
              <FormInput
                name='email'
                value={values.email}
                onChangeText={handleChange('email')}
                placeholder='Enter email'
                autoCapitalize='none'
                iconName='ios-mail'
                iconColor='#2C384A'
                onBlur={handleBlur('email')}
              />
              <ErrorMessage errorValue={touched.email && errors.email}  />
              <FormInput
                name='password'
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder='Enter password'
                secureTextEntry
                iconName='md-lock-closed'
                iconColor='#2C384A'
                onBlur={handleBlur('password')}
              />
              <ErrorMessage errorValue={touched.password && errors.password} />
              <FormInput
                name='passwordConfirmation'
                value={values.passwordConfirmation}
                onChangeText={handleChange('passwordConfirmation')}
                placeholder='Confirm your password'
                secureTextEntry
                iconName='md-lock-closed'
                iconColor='#2C384A'
                onBlur={handleBlur('passwordConfirmation')}
              />
              <ErrorMessage errorValue={touched.passwordConfirmation && errors.passwordConfirmation} />
              <CheckBox
                containerStyle={styles.checkBoxContainer}
                checkedIcon='check-box'
                iconType='material'
                uncheckedIcon='check-box-outline-blank'
                title='Agree to terms and conditions'
                checkedTitle='You agreed to our terms and conditions'
                checked={values.check}
                onPress={() => setFieldValue('check', !values.check)}
              />
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonType='outline'
                  onPress={handleSubmit}
                  title='LOGIN'
                  buttonColor='#039BE5'
                  loading = { isSubmitting }
                  disabled={!isValid || isSubmitting}
                />
              </View>
            </Fragment>
          )}
        </Formik>
        <Button
          title="Don't have an account? Sign Up"
          onPress={this.goToSignup}
          titleStyle={{
            color: '#F57C00'
          }}
          type='clear'
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  buttonContainer: {
    margin: 25
  }
})