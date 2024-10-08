import {Fragment, useState} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'


const CLASS_NAMES = [
    {id: 1, name: 'SBME 2024'},
    {id: 5, name: 'HEM 2024'},
    {id: 2, name: 'SBME 2025'},
    {id: 6, name: 'HEM 2025'},
    {id: 3, name: 'SBME 2026'},
    {id: 7, name: 'HEM 2026'},
    {id: 4, name: 'SBME 2027'},
    {id: 8, name: 'HEM 2027'},
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function ClassSelectBox({onChange}: { onChange: (event: any) => void }) {
    const [selected, setSelected] = useState(CLASS_NAMES[0])

    const onChangeHandler = (event: any) => {
        setSelected(event)
        onChange(event)
    }

    return (
        <Listbox value={selected} onChange={onChangeHandler}>
            {({open}) => (
                <>
                    <Listbox.Label className="block text-sm font-medium text-gray-900">Class </Listbox.Label>
                    <div className="relative mt-2">
                        <Listbox.Button
                            className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-AAPrimary sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected.name}</span>
              </span>
                            <span
                                className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2"
                            >
                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
              </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options
                                className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                {CLASS_NAMES.map((classObj) => (
                                    <Listbox.Option
                                        key={classObj.id}
                                        className={({active}) =>
                                            classNames(
                                                active ? 'bg-AAPrimary text-white' : 'text-gray-900',
                                                'relative cursor-default select-none py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={classObj}
                                    >
                                        {({selected, active}) => (
                                            <>
                                                <div className="flex items-center">

                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                            {classObj.name}
                          </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    )
}
