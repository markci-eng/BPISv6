"use client"

import { Button, Dialog, Flex, Portal, Separator, Strong, createOverlay } from "@chakra-ui/react"

import React from 'react'
import { LuPencil } from "react-icons/lu"
import { PrimarySmButton } from "st-peter-ui"

interface DialogProps {
  title: string,
  description?: string,
  content?: React.ReactNode
}

const dialog = createOverlay<DialogProps>((props) => {
  const { title, description, content, onOpenChange, ... rest } = props;
  
  const handleSubmit = () => {
    onOpenChange?.({open: false});
  }
  return (
    <Dialog.Root {...rest}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            {title && (
              <Dialog.Header>
                <Dialog.Title><Strong color="gray.700">{title}</Strong></Dialog.Title>
              </Dialog.Header>
            )}
            
            <Dialog.Body spaceY="4">
              {description && (
                <Dialog.Description>{description}</Dialog.Description>
              )}
              <Separator />
              {content}

              <Flex gap={3} justifyContent="flex-end">
                <Button size="sm" variant="outline" onClick={handleSubmit}>Cancel</Button>
                <PrimarySmButton onClick={handleSubmit}>Confirm</PrimarySmButton>
              </Flex>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
})

interface MainDialogProps {
  id: string,
  title: string,
  description?: string,
  content?: React.ReactNode,
  btnMessage: React.ReactNode
}

const SaleForceOverlay = (props: MainDialogProps) => {
  const { id, title, description, content, btnMessage, ... rest } = props;
  return (
    <>
      <Button size={"sm"} onClick={ () =>
        dialog.open( id, {
          title: title,
          description: description,
          content: content
        })
      }>
        {btnMessage}
      </Button>
      <dialog.Viewport />
    </>
  )
}

export default SaleForceOverlay