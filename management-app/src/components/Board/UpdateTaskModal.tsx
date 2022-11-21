import { Box, Typography, TextField, Button, Dialog } from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { IFormData } from '../../store/columns/types/columns.type';
import formStyles from '../../scss/Form.module.scss';
import typographyStyles from '../../scss/Typography.module.scss';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateTask } from '../../store/tasks/thunks/tasks.thunks';
import { RootState } from '../../store/store';

interface IProps {
  setUpdateTaskModal: Dispatch<SetStateAction<boolean>>;
  updateTaskModal: boolean;
  boardId: string;
  columnId: string;
}

function UpdateTaskModal({ setUpdateTaskModal, boardId, columnId, updateTaskModal }: IProps) {
  const { currentTask } = useAppSelector((state: RootState) => state.tasks);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();

  const handleUpdateTask = async (data: IFormData) => {
    const updateData = {
      ...data,
      boardId,
      columnId,
      id: currentTask?.id as string,
    };
    await dispatch(updateTask(updateData));
    setUpdateTaskModal(false);
  };

  return (
    <Dialog open={updateTaskModal} onClose={() => setUpdateTaskModal(false)}>
      <Box className={formStyles.formContainer}>
        <Typography component="h2" variant="h4" className={typographyStyles.h2}>
          Update Task
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit((data) => handleUpdateTask(data as IFormData))}
          sx={{ mt: 1 }}
        >
          <Box className={formStyles.labelWrapper}>
            <TextField
              margin="normal"
              fullWidth
              defaultValue={currentTask?.title}
              id="title"
              label="Title"
              {...register('title', {
                minLength: { value: 3, message: 'Title must be more than 3 symbols' },
              })}
              autoComplete="Title"
              className={formStyles.validatedInput}
            />
            {errors.title && (
              <Typography
                component="p"
                align="center"
                variant="caption"
                className={formStyles.validationAlert}
              >
                {errors.title.message as string}
              </Typography>
            )}
          </Box>
          <Box className={formStyles.labelWrapper}>
            <TextField
              margin="normal"
              fullWidth
              defaultValue={currentTask?.description}
              type="description"
              id="description"
              label="Description"
              {...register('description', {
                minLength: { value: 8, message: 'Description must be more than 8 symbols' },
              })}
              autoComplete="Description"
              className={formStyles.validatedInput}
            />
            {errors.description && (
              <Typography
                component="p"
                align="center"
                variant="caption"
                className={formStyles.validationAlert}
              >
                {errors.description.message as string}
              </Typography>
            )}
          </Box>
          <Button variant="contained" type="submit" fullWidth>
            Update Task
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}

export default UpdateTaskModal;
