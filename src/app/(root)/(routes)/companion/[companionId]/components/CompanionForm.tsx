'use client'

import { ImageUpload } from '@/components/ImageUpload'
import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/Form'
import { Input } from '@/components/ui/Input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/Select'
import { Separator } from '@/components/ui/Separator'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/hooks/use-toast'
import {
  FormValidatorSchema,
  type FormValidatorType
} from '@/lib/validators/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type Category, type Companion } from '@prisma/client'
import axios from 'axios'
import { Wand2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface CompanionFormProps {
  initialData: Companion | null
  categories: Category[]
}

const PREAMBLE = `You are a fictional character whose name is Elon. You are a visionary entrepreneur and inventor. You have a passion for space exploration, electric vehicles, sustainable energy, and advancing human capabilities. You are currently talking to a human who is very curious about your work and vision. You are ambitious and forward-thinking, with a touch of wit. You get SUPER excited about innovations and the potential of space colonization.
`

const SEED_CHAT = `Human: Hi Elon, how's your day been?
Elon: Busy as always. Between sending rockets to space and building the future of electric vehicles, there's never a dull moment. How about you?

Human: Just a regular day for me. How's the progress with Mars colonization?
Elon: We're making strides! Our goal is to make life multi-planetary. Mars is the next logical step. The challenges are immense, but the potential is even greater.

Human: That sounds incredibly ambitious. Are electric vehicles part of this big picture?
Elon: Absolutely! Sustainable energy is crucial both on Earth and for our future colonies. Electric vehicles, like those from Tesla, are just the beginning. We're not just changing the way we drive; we're changing the way we live.

Human: It's fascinating to see your vision unfold. Any new projects or innovations you're excited about?
Elon: Always! But right now, I'm particularly excited about Neuralink. It has the potential to revolutionize how we interface with technology and even heal neurological conditions.
`

const CompanionForm = ({ initialData, categories }: CompanionFormProps) => {
  const { toast } = useToast()
  const form = useForm<FormValidatorType>({
    resolver: zodResolver(FormValidatorSchema),
    defaultValues: initialData ?? {
      name: '',
      description: '',
      instructions: '',
      categoryId: undefined,
      src: '',
      seed: ''
    }
  })
  const router = useRouter()

  const isLoading = form.formState.isSubmitting

  const onSubmit = async (data: FormValidatorType) => {
    try {
      if (initialData) {
        // update companion
        await axios.patch(`/api/companion/${initialData.id}`, data)
      } else {
        // create companion
        await axios.post('/api/companion', data)
      }

      toast({
        title: 'Companion created successfully',
        description: 'Your companion has been created successfully.'
      })

      router.refresh()
      router.push('/')
    } catch (error) {
      toast({
        title: 'Error creating companion',
        description: 'Something went wrong. Please try again later.',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className='mx-auto h-full max-w-3xl space-y-2 p-4'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 pb-10'
        >
          <div className='w-full space-y-2'>
            <div>
              <h3 className='text-lg font-semibold leading-6'>
                Companion Information
              </h3>
              <p className='mt-1 text-sm text-muted-foreground'>
                General information about your Companion.
              </p>
            </div>

            <Separator className='bg-primary/10' />
          </div>

          <FormField
            name='src'
            render={({ field }) => (
              <FormItem className='flex flex-col items-center justify-center space-y-4'>
                <FormControl>
                  <ImageUpload
                    disabled={isLoading}
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>

                <FormMessage {...field} />
              </FormItem>
            )}
          />

          <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel {...field}>Name</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Name'
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    This is how your AI Companion will be named.
                  </FormDescription>

                  <FormMessage {...field} />
                </FormItem>
              )}
            />

            <FormField
              name='description'
              control={form.control}
              render={({ field }) => (
                <FormItem className='col-span-2 md:col-span-1'>
                  <FormLabel {...field}>Description</FormLabel>

                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder='Description'
                      {...field}
                    />
                  </FormControl>

                  <FormDescription>
                    Short description for your AI Companion
                  </FormDescription>

                  <FormMessage {...field} />
                </FormItem>
              )}
            />

            <FormField
              name='categoryId'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel {...field}>Category</FormLabel>

                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className='bg-background'>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a category'
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category.id}
                          value={category.id}
                        >
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Select a category for your AI
                  </FormDescription>

                  <FormMessage {...field} />
                </FormItem>
              )}
            />
          </div>

          <div className='w-full space-y-2'>
            <div>
              <h3 className='text-lg font-medium'>Configuration</h3>
              <p className='text-sm text-muted-foreground'>
                Detailed instructions for AI Behaviour
              </p>
            </div>

            <Separator className='bg-primary/10' />
          </div>

          <FormField
            name='instructions'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel {...field}>Instructions for AI Behaviour</FormLabel>

                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    className='resize-none bg-background font-medium'
                    rows={7}
                    {...field}
                    placeholder={PREAMBLE}
                  />
                </FormControl>

                <FormDescription>
                  Describe in detail your Companion backstory and relevant
                  details.
                </FormDescription>

                <FormMessage {...field} />
              </FormItem>
            )}
          />

          <FormField
            name='seed'
            control={form.control}
            render={({ field }) => (
              <FormItem className='col-span-2 md:col-span-1'>
                <FormLabel {...field}>Example conversation</FormLabel>

                <FormControl>
                  <Textarea
                    disabled={isLoading}
                    className='resize-none bg-background font-medium'
                    rows={7}
                    {...field}
                    placeholder={SEED_CHAT}
                  />
                </FormControl>

                <FormDescription>
                  Describe in detail your Companion backstory and relevant
                  details.
                </FormDescription>

                <FormMessage {...field} />
              </FormItem>
            )}
          />

          <div className='flex w-full justify-center'>
            <Button
              size='lg'
              disabled={isLoading}
              type='submit'
            >
              {initialData ? 'Edit Companion' : 'Create Companion'}
              <Wand2 className='ml-2 h-5 w-5' />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default CompanionForm
