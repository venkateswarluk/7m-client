import * as React from 'react'

export const Modal: (
  { children, closeModal, modalState, title }: any,
) => JSX.Element = ({ children, closeModal, modalState, title }) => {
  return (
    <div>
      {modalState ? (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeModal} />
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">{title}</p>
              <button className="delete" onClick={closeModal} />
            </header>
            <section className="modal-card-body">
              <div className="content">{children}</div>
            </section>
            <footer className="modal-card-foot">
              <a className="button" onClick={closeModal}>
                Cancel
              </a>
            </footer>
          </div>
        </div>
      ) : (
        <div />
      )}
    </div>
  )
}
