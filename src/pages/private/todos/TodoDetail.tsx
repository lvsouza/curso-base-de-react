import { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { parseISO, isValid, format, parse } from 'date-fns';
import { useNavigate, useParams } from 'react-router';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarIcon } from 'lucide-react';
import { z } from 'zod/v4';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TodoAPI, type ITodoWithoutId } from '../../../shared/services/api/TodoAPI';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { PageLayout } from '../../../shared/layout/page-layout/PageLayout';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';


const todoSchema = z
  .object({
    complete: z.boolean(),
    label: z.string().min(3, 'Deve ter pelo menos 3 caracteres'),
    description: z.string().min(3, 'Deve ter pelo menos 3 caracteres'),
    completeAt: z
      .string()
      .optional()
      .refine((datetimeLocal) => {
        if (!datetimeLocal) return true;

        const parsedDate = parseISO(datetimeLocal);
        return isValid(parsedDate);
      }, 'A data não está correta'),
  })
  .refine((data) => {
    if (data.complete && !data.completeAt) return false;
    return true;
  }, { path: ['completeAt'], error: 'A data precisa ser informada' })

export const TodoDetail = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();


  const form = useForm<ITodoWithoutId>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      label: '',
      description: '',
      complete: false,
      completeAt: '',
    }
  });

  const complete = form.watch('complete');


  useEffect(() => {
    if (!id || id === 'adicionar') {
      form.reset();
      return;
    }

    setIsLoading(true);
    TodoAPI
      .getById(id)
      .then(data => {
        form.reset(data);
        setIsLoading(false);
      })
  }, [id]);


  const handleOnSubmit: SubmitHandler<ITodoWithoutId> = async ({ label, description, complete, completeAt }) => {
    if (!id || id === 'adicionar') {
      await TodoAPI.create({ label, description, complete, completeAt });
    } else {
      await TodoAPI.updateById(id, { label, description, complete, completeAt });
    }

    navigate('/todos');
  }


  return (
    <PageLayout title={id === 'adicionar' ? 'Adicionar' : 'Detalhes'}>
      <Form {...form}>
        <form className='flex flex-col gap-6' onSubmit={form.handleSubmit(handleOnSubmit)}>
          <FormField
            name="label"
            control={form.control}
            render={({ field, fieldState, formState }) => (
              <FormItem className='w-90'>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input {...field} disabled={formState.isSubmitting || isLoading} />
                </FormControl>
                {fieldState.error?.message
                  ? <FormMessage />
                  : <FormDescription>
                    Título identificador do item
                  </FormDescription>
                }
              </FormItem>
            )}
          />
          <FormField
            name="description"
            control={form.control}
            render={({ field, fieldState, formState }) => (
              <FormItem className='w-90'>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Input {...field} disabled={formState.isSubmitting || isLoading} />
                </FormControl>
                {fieldState.error?.message
                  ? <FormMessage />
                  : <FormDescription>
                    Descreva em mais detalhes o item a fazer
                  </FormDescription>
                }
              </FormItem>
            )}
          />
          <FormField
            name="complete"
            control={form.control}
            render={({ field, fieldState, formState }) => (
              <FormItem className='w-90'>
                <FormLabel>Finalizado</FormLabel>
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    disabled={formState.isSubmitting || isLoading}
                    onCheckedChange={checked => field.onChange(checked)}
                  />
                </FormControl>
                {fieldState.error?.message
                  ? <FormMessage />
                  : <FormDescription>
                    Marca o item como finalizado
                  </FormDescription>
                }
              </FormItem>
            )}
          />
          {complete && (
            <FormField
              name="completeAt"
              control={form.control}
              render={({ field, fieldState, formState }) => (
                <FormItem className='w-90'>
                  <FormLabel>Data e hora de finalização</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <div className='flex gap-2'>
                          <Button
                            type='button'
                            variant="outline"
                            disabled={formState.isSubmitting || isLoading}
                            className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Selecione uma data</span>}
                            <CalendarIcon className="h-4 w-4 opacity-50 ml-auto" />
                          </Button>

                          <Input
                            step="1"
                            type="time"
                            onClick={e => e.stopPropagation()}
                            disabled={formState.isSubmitting || isLoading}
                            value={field.value ? format(parseISO(field.value), 'HH:mm:ss') : ''}
                            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                            onChange={e => {
                              if (!e.target.value) {
                                field.onChange(undefined);
                                return;
                              }

                              const parsedDate = field.value ? parseISO(field.value) : new Date();
                              const parsedDatetime = parse(e.target.value, 'HH:mm:ss', parsedDate);

                              field.onChange(format(parsedDatetime, "yyyy-MM-dd'T'HH:mm"));
                            }}
                          />
                        </div>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        captionLayout="dropdown"
                        selected={field.value ? parseISO(field.value) : undefined}
                        onSelect={value => field.onChange(value ? format(value, "yyyy-MM-dd'T'HH:mm") : undefined)}
                      />
                    </PopoverContent>
                  </Popover>
                  {fieldState.error?.message
                    ? <FormMessage />
                    : <FormDescription>
                      Data em que o item foi finalizado

                      {field.value && (
                        <Button variant='link' type='button' className='py-0 h-auto' onClick={() => field.onChange(undefined)}>
                          Limpar
                        </Button>
                      )}
                    </FormDescription>
                  }
                </FormItem>
              )}
            />
          )}

          <Button type='submit' className='self-start'>
            Salvar
          </Button>
        </form>
      </Form>
    </PageLayout>
  );
};
